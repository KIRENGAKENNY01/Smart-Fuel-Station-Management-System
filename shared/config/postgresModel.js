import crypto from "crypto";
import { query } from "./db.js";

const id = () => crypto.randomBytes(12).toString("hex");

const serialize = (value) => {
  if (value instanceof Date) return value;
  if (value && typeof value === "object" && typeof value.toISOString === "function") return value.toISOString();
  return value;
};

const clone = (row) => JSON.parse(JSON.stringify(row));

export class PgDocument {
  constructor(model, row) {
    Object.defineProperty(this, "__model", { value: model, enumerable: false });
    Object.assign(this, row);
  }

  toObject() {
    return clone(this);
  }

  toJSON() {
    const obj = this.toObject();
    if (this.__model.toJSON) return this.__model.toJSON(obj);
    return obj;
  }

  async save() {
    const data = {};
    for (const column of this.__model.columns) {
      if (this[column] !== undefined) data[column] = this[column];
    }
    const saved = await this.__model.findByIdAndUpdate(this._id, data, { new: true });
    Object.assign(this, saved?.toObject ? saved.toObject() : saved);
    return this;
  }
}

class PgQuery {
  constructor(model, filter = {}, single = false) {
    this.model = model;
    this.filter = filter || {};
    this.single = single;
    this._sort = null;
    this._skip = 0;
    this._limit = null;
    this._select = null;
    this._populate = [];
  }

  select(fields) {
    this._select = String(fields || "").split(/\s+/).filter(Boolean);
    return this;
  }

  sort(sort) {
    this._sort = sort;
    return this;
  }

  skip(value) {
    this._skip = Number(value) || 0;
    return this;
  }

  limit(value) {
    this._limit = Number(value) || null;
    return this;
  }

  populate(field) {
    this._populate.push(field);
    return this;
  }

  then(resolve, reject) {
    return this.exec().then(resolve, reject);
  }

  catch(reject) {
    return this.exec().catch(reject);
  }

  async exec() {
    const rows = await this.model._findRows(this.filter, {
      sort: this._sort,
      skip: this._skip,
      limit: this.single ? 1 : this._limit,
    });
    let docs = rows.map((row) => this.model._doc(row));
    for (const field of this._populate) docs = await this.model._populate(docs, field);
    docs = docs.map((doc) => this.model._project(doc, this._select));
    return this.single ? docs[0] || null : docs;
  }
}

const columnFor = (field) => (field === "id" ? "_id" : field);

const buildWhere = (filter = {}) => {
  const values = [];
  const clauses = [];
  let nearby = null;

  for (const [rawField, rawValue] of Object.entries(filter || {})) {
    const field = columnFor(rawField);
    const value = serialize(rawValue);

    if (field === "location" && value?.$near) {
      nearby = value.$near;
      continue;
    }

    if (value && typeof value === "object" && !(value instanceof Date) && !Array.isArray(value)) {
      if ("$ne" in value) {
        values.push(serialize(value.$ne));
        clauses.push(`${field} is distinct from $${values.length}`);
      }
      if ("$in" in value) {
        values.push(value.$in);
        clauses.push(`${field} = any($${values.length})`);
      }
      if ("$gte" in value) {
        values.push(serialize(value.$gte));
        clauses.push(`${field} >= $${values.length}`);
      }
      if ("$lte" in value) {
        values.push(serialize(value.$lte));
        clauses.push(`${field} <= $${values.length}`);
      }
      continue;
    }

    values.push(value);
    clauses.push(`${field} = $${values.length}`);
  }

  if (nearby) {
    const [lon, lat] = nearby.$geometry?.coordinates || [0, 0];
    const maxDistance = Number(nearby.$maxDistance || 5000);
    const distanceExpr =
      "6371000 * acos(least(1, greatest(-1, cos(radians($${latParam})) * cos(radians((location->'coordinates'->>1)::numeric)) * cos(radians((location->'coordinates'->>0)::numeric) - radians($${lonParam})) + sin(radians($${latParam})) * sin(radians((location->'coordinates'->>1)::numeric)))))";
    values.push(lat);
    const latParam = values.length;
    values.push(lon);
    const lonParam = values.length;
    const expr = distanceExpr
      .replaceAll("${latParam}", String(latParam))
      .replaceAll("${lonParam}", String(lonParam));
    values.push(maxDistance);
    clauses.push(`${expr} <= $${values.length}`);
    return { where: clauses.length ? `where ${clauses.join(" and ")}` : "", values, nearbyOrder: expr };
  }

  return { where: clauses.length ? `where ${clauses.join(" and ")}` : "", values };
};

const buildSort = (sort, nearbyOrder) => {
  if (nearbyOrder) return `order by ${nearbyOrder} asc`;
  if (!sort || typeof sort !== "object") return "";
  const entries = Object.entries(sort);
  if (!entries.length) return "";
  return `order by ${entries.map(([field, dir]) => `${columnFor(field)} ${Number(dir) < 0 ? "desc" : "asc"}`).join(", ")}`;
};

export const createModel = (definition) => {
  const model = {
    table: definition.table,
    columns: definition.columns,
    defaults: definition.defaults || {},
    populates: definition.populates || {},
    toJSON: definition.toJSON,

    _doc(row) {
      return new PgDocument(model, row);
    },

    _project(doc, select) {
      if (!select?.length) return doc;
      const obj = doc.toObject ? doc.toObject() : { ...doc };
      const excludes = select.filter((field) => field.startsWith("-")).map((field) => field.slice(1));
      const includes = select.filter((field) => !field.startsWith("-"));
      let out = obj;
      if (includes.length) {
        out = {};
        includes.forEach((field) => {
          if (obj[field] !== undefined) out[field] = obj[field];
        });
      }
      excludes.forEach((field) => delete out[field]);
      return model._doc(out);
    },

    async _populate(docs, field) {
      const populate = model.populates[field];
      if (!populate || !docs.length) return docs;
      const ids = [...new Set(docs.map((doc) => doc[field]).filter(Boolean).map(String))];
      if (!ids.length) return docs;
      const res = await query(`select * from ${populate.table} where _id = any($1)`, [ids]);
      const byId = new Map(res.rows.map((row) => [String(row._id), row]));
      return docs.map((doc) => {
        if (doc[field] && byId.has(String(doc[field]))) doc[field] = new PgDocument({ columns: Object.keys(byId.get(String(doc[field]))) }, byId.get(String(doc[field])));
        return doc;
      });
    },

    async _findRows(filter, options = {}) {
      const { where, values, nearbyOrder } = buildWhere(filter);
      const order = buildSort(options.sort, nearbyOrder);
      const limit = options.limit ? `limit ${Number(options.limit)}` : "";
      const offset = options.skip ? `offset ${Number(options.skip)}` : "";
      const sql = `select * from ${model.table} ${where} ${order} ${limit} ${offset}`;
      const res = await query(sql, values);
      return res.rows;
    },

    find(filter = {}) {
      return new PgQuery(model, filter, false);
    },

    findOne(filter = {}) {
      return new PgQuery(model, filter, true);
    },

    async findById(idValue) {
      return this.findOne({ _id: String(idValue) });
    },

    async create(data) {
      if (Array.isArray(data)) return Promise.all(data.map((item) => this.create(item)));
      const now = new Date();
      const payload = { _id: data._id || id(), ...this.defaults, ...data };
      if (this.columns.includes("created_at") && !payload.created_at) payload.created_at = now;
      if (this.columns.includes("updated_at") && !payload.updated_at) payload.updated_at = now;

      const columns = this.columns.filter((column) => payload[column] !== undefined);
      const values = columns.map((column) => serialize(payload[column]));
      const placeholders = columns.map((_, index) => `$${index + 1}`).join(", ");
      const sql = `insert into ${this.table} (${columns.join(", ")}) values (${placeholders}) returning *`;
      const res = await query(sql, values);
      return this._doc(res.rows[0]);
    },

    async findByIdAndUpdate(idValue, updates, options = {}) {
      const data = { ...updates };
      if (this.columns.includes("updated_at") && data.updated_at === undefined) data.updated_at = new Date();
      if (data.$set) Object.assign(data, data.$set);
      delete data.$set;
      if (data.$inc) {
        const incEntries = Object.entries(data.$inc);
        delete data.$inc;
        const assignments = [];
        const values = [];
        for (const [field, amount] of incEntries) {
          assignments.push(`${field} = ${field} + $${values.push(amount)}`);
        }
        for (const [field, value] of Object.entries(data)) {
          if (!this.columns.includes(field)) continue;
          assignments.push(`${field} = $${values.push(serialize(value))}`);
        }
        values.push(String(idValue));
        const res = await query(`update ${this.table} set ${assignments.join(", ")} where _id = $${values.length} returning *`, values);
        return options.new === false ? null : res.rows[0] ? this._doc(res.rows[0]) : null;
      }
      const entries = Object.entries(data).filter(([field]) => this.columns.includes(field));
      if (!entries.length) return this.findById(idValue);
      const values = entries.map(([, value]) => serialize(value));
      const assignments = entries.map(([field], index) => `${field} = $${index + 1}`);
      values.push(String(idValue));
      const res = await query(`update ${this.table} set ${assignments.join(", ")} where _id = $${values.length} returning *`, values);
      return res.rows[0] ? this._doc(res.rows[0]) : null;
    },

    async findOneAndUpdate(filter, updates, options = {}) {
      const existing = await this.findOne(filter);
      if (!existing) return null;
      return this.findByIdAndUpdate(existing._id, updates, options);
    },

    async findByIdAndDelete(idValue) {
      const res = await query(`delete from ${this.table} where _id = $1 returning *`, [String(idValue)]);
      return res.rows[0] ? this._doc(res.rows[0]) : null;
    },

    async deleteOne(filter = {}) {
      const existing = await this.findOne(filter);
      if (!existing) return { deletedCount: 0 };
      await this.findByIdAndDelete(existing._id);
      return { deletedCount: 1 };
    },

    async deleteMany(filter = {}) {
      const { where, values } = buildWhere(filter);
      const res = await query(`delete from ${this.table} ${where}`, values);
      return { deletedCount: res.rowCount };
    },

    async countDocuments(filter = {}) {
      const { where, values } = buildWhere(filter);
      const res = await query(`select count(*)::int as count from ${this.table} ${where}`, values);
      return res.rows[0]?.count || 0;
    },
  };

  return model;
};
