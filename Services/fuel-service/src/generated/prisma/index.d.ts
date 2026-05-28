
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model FuelType
 * 
 */
export type FuelType = $Result.DefaultSelection<Prisma.$FuelTypePayload>
/**
 * Model FuelInventory
 * 
 */
export type FuelInventory = $Result.DefaultSelection<Prisma.$FuelInventoryPayload>
/**
 * Model Supply
 * 
 */
export type Supply = $Result.DefaultSelection<Prisma.$SupplyPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const FuelTypeName: {
  PETROL: 'PETROL',
  DIESEL: 'DIESEL'
};

export type FuelTypeName = (typeof FuelTypeName)[keyof typeof FuelTypeName]

}

export type FuelTypeName = $Enums.FuelTypeName

export const FuelTypeName: typeof $Enums.FuelTypeName

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more FuelTypes
 * const fuelTypes = await prisma.fuelType.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more FuelTypes
   * const fuelTypes = await prisma.fuelType.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.fuelType`: Exposes CRUD operations for the **FuelType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FuelTypes
    * const fuelTypes = await prisma.fuelType.findMany()
    * ```
    */
  get fuelType(): Prisma.FuelTypeDelegate<ExtArgs>;

  /**
   * `prisma.fuelInventory`: Exposes CRUD operations for the **FuelInventory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FuelInventories
    * const fuelInventories = await prisma.fuelInventory.findMany()
    * ```
    */
  get fuelInventory(): Prisma.FuelInventoryDelegate<ExtArgs>;

  /**
   * `prisma.supply`: Exposes CRUD operations for the **Supply** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Supplies
    * const supplies = await prisma.supply.findMany()
    * ```
    */
  get supply(): Prisma.SupplyDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    FuelType: 'FuelType',
    FuelInventory: 'FuelInventory',
    Supply: 'Supply'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "fuelType" | "fuelInventory" | "supply"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      FuelType: {
        payload: Prisma.$FuelTypePayload<ExtArgs>
        fields: Prisma.FuelTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FuelTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FuelTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelTypePayload>
          }
          findFirst: {
            args: Prisma.FuelTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FuelTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelTypePayload>
          }
          findMany: {
            args: Prisma.FuelTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelTypePayload>[]
          }
          create: {
            args: Prisma.FuelTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelTypePayload>
          }
          createMany: {
            args: Prisma.FuelTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FuelTypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelTypePayload>[]
          }
          delete: {
            args: Prisma.FuelTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelTypePayload>
          }
          update: {
            args: Prisma.FuelTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelTypePayload>
          }
          deleteMany: {
            args: Prisma.FuelTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FuelTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FuelTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelTypePayload>
          }
          aggregate: {
            args: Prisma.FuelTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFuelType>
          }
          groupBy: {
            args: Prisma.FuelTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<FuelTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.FuelTypeCountArgs<ExtArgs>
            result: $Utils.Optional<FuelTypeCountAggregateOutputType> | number
          }
        }
      }
      FuelInventory: {
        payload: Prisma.$FuelInventoryPayload<ExtArgs>
        fields: Prisma.FuelInventoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FuelInventoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelInventoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FuelInventoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelInventoryPayload>
          }
          findFirst: {
            args: Prisma.FuelInventoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelInventoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FuelInventoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelInventoryPayload>
          }
          findMany: {
            args: Prisma.FuelInventoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelInventoryPayload>[]
          }
          create: {
            args: Prisma.FuelInventoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelInventoryPayload>
          }
          createMany: {
            args: Prisma.FuelInventoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FuelInventoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelInventoryPayload>[]
          }
          delete: {
            args: Prisma.FuelInventoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelInventoryPayload>
          }
          update: {
            args: Prisma.FuelInventoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelInventoryPayload>
          }
          deleteMany: {
            args: Prisma.FuelInventoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FuelInventoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FuelInventoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FuelInventoryPayload>
          }
          aggregate: {
            args: Prisma.FuelInventoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFuelInventory>
          }
          groupBy: {
            args: Prisma.FuelInventoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<FuelInventoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.FuelInventoryCountArgs<ExtArgs>
            result: $Utils.Optional<FuelInventoryCountAggregateOutputType> | number
          }
        }
      }
      Supply: {
        payload: Prisma.$SupplyPayload<ExtArgs>
        fields: Prisma.SupplyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SupplyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SupplyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplyPayload>
          }
          findFirst: {
            args: Prisma.SupplyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SupplyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplyPayload>
          }
          findMany: {
            args: Prisma.SupplyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplyPayload>[]
          }
          create: {
            args: Prisma.SupplyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplyPayload>
          }
          createMany: {
            args: Prisma.SupplyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SupplyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplyPayload>[]
          }
          delete: {
            args: Prisma.SupplyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplyPayload>
          }
          update: {
            args: Prisma.SupplyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplyPayload>
          }
          deleteMany: {
            args: Prisma.SupplyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SupplyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SupplyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplyPayload>
          }
          aggregate: {
            args: Prisma.SupplyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSupply>
          }
          groupBy: {
            args: Prisma.SupplyGroupByArgs<ExtArgs>
            result: $Utils.Optional<SupplyGroupByOutputType>[]
          }
          count: {
            args: Prisma.SupplyCountArgs<ExtArgs>
            result: $Utils.Optional<SupplyCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type FuelTypeCountOutputType
   */

  export type FuelTypeCountOutputType = {
    inventory: number
    supplies: number
  }

  export type FuelTypeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inventory?: boolean | FuelTypeCountOutputTypeCountInventoryArgs
    supplies?: boolean | FuelTypeCountOutputTypeCountSuppliesArgs
  }

  // Custom InputTypes
  /**
   * FuelTypeCountOutputType without action
   */
  export type FuelTypeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelTypeCountOutputType
     */
    select?: FuelTypeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FuelTypeCountOutputType without action
   */
  export type FuelTypeCountOutputTypeCountInventoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FuelInventoryWhereInput
  }

  /**
   * FuelTypeCountOutputType without action
   */
  export type FuelTypeCountOutputTypeCountSuppliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupplyWhereInput
  }


  /**
   * Models
   */

  /**
   * Model FuelType
   */

  export type AggregateFuelType = {
    _count: FuelTypeCountAggregateOutputType | null
    _min: FuelTypeMinAggregateOutputType | null
    _max: FuelTypeMaxAggregateOutputType | null
  }

  export type FuelTypeMinAggregateOutputType = {
    id: string | null
    name: $Enums.FuelTypeName | null
  }

  export type FuelTypeMaxAggregateOutputType = {
    id: string | null
    name: $Enums.FuelTypeName | null
  }

  export type FuelTypeCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type FuelTypeMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type FuelTypeMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type FuelTypeCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type FuelTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FuelType to aggregate.
     */
    where?: FuelTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FuelTypes to fetch.
     */
    orderBy?: FuelTypeOrderByWithRelationInput | FuelTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FuelTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FuelTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FuelTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FuelTypes
    **/
    _count?: true | FuelTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FuelTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FuelTypeMaxAggregateInputType
  }

  export type GetFuelTypeAggregateType<T extends FuelTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateFuelType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFuelType[P]>
      : GetScalarType<T[P], AggregateFuelType[P]>
  }




  export type FuelTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FuelTypeWhereInput
    orderBy?: FuelTypeOrderByWithAggregationInput | FuelTypeOrderByWithAggregationInput[]
    by: FuelTypeScalarFieldEnum[] | FuelTypeScalarFieldEnum
    having?: FuelTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FuelTypeCountAggregateInputType | true
    _min?: FuelTypeMinAggregateInputType
    _max?: FuelTypeMaxAggregateInputType
  }

  export type FuelTypeGroupByOutputType = {
    id: string
    name: $Enums.FuelTypeName
    _count: FuelTypeCountAggregateOutputType | null
    _min: FuelTypeMinAggregateOutputType | null
    _max: FuelTypeMaxAggregateOutputType | null
  }

  type GetFuelTypeGroupByPayload<T extends FuelTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FuelTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FuelTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FuelTypeGroupByOutputType[P]>
            : GetScalarType<T[P], FuelTypeGroupByOutputType[P]>
        }
      >
    >


  export type FuelTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    inventory?: boolean | FuelType$inventoryArgs<ExtArgs>
    supplies?: boolean | FuelType$suppliesArgs<ExtArgs>
    _count?: boolean | FuelTypeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fuelType"]>

  export type FuelTypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["fuelType"]>

  export type FuelTypeSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type FuelTypeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inventory?: boolean | FuelType$inventoryArgs<ExtArgs>
    supplies?: boolean | FuelType$suppliesArgs<ExtArgs>
    _count?: boolean | FuelTypeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FuelTypeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FuelTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FuelType"
    objects: {
      inventory: Prisma.$FuelInventoryPayload<ExtArgs>[]
      supplies: Prisma.$SupplyPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: $Enums.FuelTypeName
    }, ExtArgs["result"]["fuelType"]>
    composites: {}
  }

  type FuelTypeGetPayload<S extends boolean | null | undefined | FuelTypeDefaultArgs> = $Result.GetResult<Prisma.$FuelTypePayload, S>

  type FuelTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FuelTypeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FuelTypeCountAggregateInputType | true
    }

  export interface FuelTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FuelType'], meta: { name: 'FuelType' } }
    /**
     * Find zero or one FuelType that matches the filter.
     * @param {FuelTypeFindUniqueArgs} args - Arguments to find a FuelType
     * @example
     * // Get one FuelType
     * const fuelType = await prisma.fuelType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FuelTypeFindUniqueArgs>(args: SelectSubset<T, FuelTypeFindUniqueArgs<ExtArgs>>): Prisma__FuelTypeClient<$Result.GetResult<Prisma.$FuelTypePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one FuelType that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FuelTypeFindUniqueOrThrowArgs} args - Arguments to find a FuelType
     * @example
     * // Get one FuelType
     * const fuelType = await prisma.fuelType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FuelTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, FuelTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FuelTypeClient<$Result.GetResult<Prisma.$FuelTypePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first FuelType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuelTypeFindFirstArgs} args - Arguments to find a FuelType
     * @example
     * // Get one FuelType
     * const fuelType = await prisma.fuelType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FuelTypeFindFirstArgs>(args?: SelectSubset<T, FuelTypeFindFirstArgs<ExtArgs>>): Prisma__FuelTypeClient<$Result.GetResult<Prisma.$FuelTypePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first FuelType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuelTypeFindFirstOrThrowArgs} args - Arguments to find a FuelType
     * @example
     * // Get one FuelType
     * const fuelType = await prisma.fuelType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FuelTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, FuelTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__FuelTypeClient<$Result.GetResult<Prisma.$FuelTypePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more FuelTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuelTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FuelTypes
     * const fuelTypes = await prisma.fuelType.findMany()
     * 
     * // Get first 10 FuelTypes
     * const fuelTypes = await prisma.fuelType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fuelTypeWithIdOnly = await prisma.fuelType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FuelTypeFindManyArgs>(args?: SelectSubset<T, FuelTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FuelTypePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a FuelType.
     * @param {FuelTypeCreateArgs} args - Arguments to create a FuelType.
     * @example
     * // Create one FuelType
     * const FuelType = await prisma.fuelType.create({
     *   data: {
     *     // ... data to create a FuelType
     *   }
     * })
     * 
     */
    create<T extends FuelTypeCreateArgs>(args: SelectSubset<T, FuelTypeCreateArgs<ExtArgs>>): Prisma__FuelTypeClient<$Result.GetResult<Prisma.$FuelTypePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many FuelTypes.
     * @param {FuelTypeCreateManyArgs} args - Arguments to create many FuelTypes.
     * @example
     * // Create many FuelTypes
     * const fuelType = await prisma.fuelType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FuelTypeCreateManyArgs>(args?: SelectSubset<T, FuelTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FuelTypes and returns the data saved in the database.
     * @param {FuelTypeCreateManyAndReturnArgs} args - Arguments to create many FuelTypes.
     * @example
     * // Create many FuelTypes
     * const fuelType = await prisma.fuelType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FuelTypes and only return the `id`
     * const fuelTypeWithIdOnly = await prisma.fuelType.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FuelTypeCreateManyAndReturnArgs>(args?: SelectSubset<T, FuelTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FuelTypePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a FuelType.
     * @param {FuelTypeDeleteArgs} args - Arguments to delete one FuelType.
     * @example
     * // Delete one FuelType
     * const FuelType = await prisma.fuelType.delete({
     *   where: {
     *     // ... filter to delete one FuelType
     *   }
     * })
     * 
     */
    delete<T extends FuelTypeDeleteArgs>(args: SelectSubset<T, FuelTypeDeleteArgs<ExtArgs>>): Prisma__FuelTypeClient<$Result.GetResult<Prisma.$FuelTypePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one FuelType.
     * @param {FuelTypeUpdateArgs} args - Arguments to update one FuelType.
     * @example
     * // Update one FuelType
     * const fuelType = await prisma.fuelType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FuelTypeUpdateArgs>(args: SelectSubset<T, FuelTypeUpdateArgs<ExtArgs>>): Prisma__FuelTypeClient<$Result.GetResult<Prisma.$FuelTypePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more FuelTypes.
     * @param {FuelTypeDeleteManyArgs} args - Arguments to filter FuelTypes to delete.
     * @example
     * // Delete a few FuelTypes
     * const { count } = await prisma.fuelType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FuelTypeDeleteManyArgs>(args?: SelectSubset<T, FuelTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FuelTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuelTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FuelTypes
     * const fuelType = await prisma.fuelType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FuelTypeUpdateManyArgs>(args: SelectSubset<T, FuelTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FuelType.
     * @param {FuelTypeUpsertArgs} args - Arguments to update or create a FuelType.
     * @example
     * // Update or create a FuelType
     * const fuelType = await prisma.fuelType.upsert({
     *   create: {
     *     // ... data to create a FuelType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FuelType we want to update
     *   }
     * })
     */
    upsert<T extends FuelTypeUpsertArgs>(args: SelectSubset<T, FuelTypeUpsertArgs<ExtArgs>>): Prisma__FuelTypeClient<$Result.GetResult<Prisma.$FuelTypePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of FuelTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuelTypeCountArgs} args - Arguments to filter FuelTypes to count.
     * @example
     * // Count the number of FuelTypes
     * const count = await prisma.fuelType.count({
     *   where: {
     *     // ... the filter for the FuelTypes we want to count
     *   }
     * })
    **/
    count<T extends FuelTypeCountArgs>(
      args?: Subset<T, FuelTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FuelTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FuelType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuelTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FuelTypeAggregateArgs>(args: Subset<T, FuelTypeAggregateArgs>): Prisma.PrismaPromise<GetFuelTypeAggregateType<T>>

    /**
     * Group by FuelType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuelTypeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FuelTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FuelTypeGroupByArgs['orderBy'] }
        : { orderBy?: FuelTypeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FuelTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFuelTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FuelType model
   */
  readonly fields: FuelTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FuelType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FuelTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    inventory<T extends FuelType$inventoryArgs<ExtArgs> = {}>(args?: Subset<T, FuelType$inventoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FuelInventoryPayload<ExtArgs>, T, "findMany"> | Null>
    supplies<T extends FuelType$suppliesArgs<ExtArgs> = {}>(args?: Subset<T, FuelType$suppliesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplyPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FuelType model
   */ 
  interface FuelTypeFieldRefs {
    readonly id: FieldRef<"FuelType", 'String'>
    readonly name: FieldRef<"FuelType", 'FuelTypeName'>
  }
    

  // Custom InputTypes
  /**
   * FuelType findUnique
   */
  export type FuelTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelType
     */
    select?: FuelTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelTypeInclude<ExtArgs> | null
    /**
     * Filter, which FuelType to fetch.
     */
    where: FuelTypeWhereUniqueInput
  }

  /**
   * FuelType findUniqueOrThrow
   */
  export type FuelTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelType
     */
    select?: FuelTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelTypeInclude<ExtArgs> | null
    /**
     * Filter, which FuelType to fetch.
     */
    where: FuelTypeWhereUniqueInput
  }

  /**
   * FuelType findFirst
   */
  export type FuelTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelType
     */
    select?: FuelTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelTypeInclude<ExtArgs> | null
    /**
     * Filter, which FuelType to fetch.
     */
    where?: FuelTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FuelTypes to fetch.
     */
    orderBy?: FuelTypeOrderByWithRelationInput | FuelTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FuelTypes.
     */
    cursor?: FuelTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FuelTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FuelTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FuelTypes.
     */
    distinct?: FuelTypeScalarFieldEnum | FuelTypeScalarFieldEnum[]
  }

  /**
   * FuelType findFirstOrThrow
   */
  export type FuelTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelType
     */
    select?: FuelTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelTypeInclude<ExtArgs> | null
    /**
     * Filter, which FuelType to fetch.
     */
    where?: FuelTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FuelTypes to fetch.
     */
    orderBy?: FuelTypeOrderByWithRelationInput | FuelTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FuelTypes.
     */
    cursor?: FuelTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FuelTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FuelTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FuelTypes.
     */
    distinct?: FuelTypeScalarFieldEnum | FuelTypeScalarFieldEnum[]
  }

  /**
   * FuelType findMany
   */
  export type FuelTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelType
     */
    select?: FuelTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelTypeInclude<ExtArgs> | null
    /**
     * Filter, which FuelTypes to fetch.
     */
    where?: FuelTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FuelTypes to fetch.
     */
    orderBy?: FuelTypeOrderByWithRelationInput | FuelTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FuelTypes.
     */
    cursor?: FuelTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FuelTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FuelTypes.
     */
    skip?: number
    distinct?: FuelTypeScalarFieldEnum | FuelTypeScalarFieldEnum[]
  }

  /**
   * FuelType create
   */
  export type FuelTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelType
     */
    select?: FuelTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelTypeInclude<ExtArgs> | null
    /**
     * The data needed to create a FuelType.
     */
    data: XOR<FuelTypeCreateInput, FuelTypeUncheckedCreateInput>
  }

  /**
   * FuelType createMany
   */
  export type FuelTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FuelTypes.
     */
    data: FuelTypeCreateManyInput | FuelTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FuelType createManyAndReturn
   */
  export type FuelTypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelType
     */
    select?: FuelTypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many FuelTypes.
     */
    data: FuelTypeCreateManyInput | FuelTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FuelType update
   */
  export type FuelTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelType
     */
    select?: FuelTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelTypeInclude<ExtArgs> | null
    /**
     * The data needed to update a FuelType.
     */
    data: XOR<FuelTypeUpdateInput, FuelTypeUncheckedUpdateInput>
    /**
     * Choose, which FuelType to update.
     */
    where: FuelTypeWhereUniqueInput
  }

  /**
   * FuelType updateMany
   */
  export type FuelTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FuelTypes.
     */
    data: XOR<FuelTypeUpdateManyMutationInput, FuelTypeUncheckedUpdateManyInput>
    /**
     * Filter which FuelTypes to update
     */
    where?: FuelTypeWhereInput
  }

  /**
   * FuelType upsert
   */
  export type FuelTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelType
     */
    select?: FuelTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelTypeInclude<ExtArgs> | null
    /**
     * The filter to search for the FuelType to update in case it exists.
     */
    where: FuelTypeWhereUniqueInput
    /**
     * In case the FuelType found by the `where` argument doesn't exist, create a new FuelType with this data.
     */
    create: XOR<FuelTypeCreateInput, FuelTypeUncheckedCreateInput>
    /**
     * In case the FuelType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FuelTypeUpdateInput, FuelTypeUncheckedUpdateInput>
  }

  /**
   * FuelType delete
   */
  export type FuelTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelType
     */
    select?: FuelTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelTypeInclude<ExtArgs> | null
    /**
     * Filter which FuelType to delete.
     */
    where: FuelTypeWhereUniqueInput
  }

  /**
   * FuelType deleteMany
   */
  export type FuelTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FuelTypes to delete
     */
    where?: FuelTypeWhereInput
  }

  /**
   * FuelType.inventory
   */
  export type FuelType$inventoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelInventory
     */
    select?: FuelInventorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelInventoryInclude<ExtArgs> | null
    where?: FuelInventoryWhereInput
    orderBy?: FuelInventoryOrderByWithRelationInput | FuelInventoryOrderByWithRelationInput[]
    cursor?: FuelInventoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FuelInventoryScalarFieldEnum | FuelInventoryScalarFieldEnum[]
  }

  /**
   * FuelType.supplies
   */
  export type FuelType$suppliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supply
     */
    select?: SupplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplyInclude<ExtArgs> | null
    where?: SupplyWhereInput
    orderBy?: SupplyOrderByWithRelationInput | SupplyOrderByWithRelationInput[]
    cursor?: SupplyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SupplyScalarFieldEnum | SupplyScalarFieldEnum[]
  }

  /**
   * FuelType without action
   */
  export type FuelTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelType
     */
    select?: FuelTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelTypeInclude<ExtArgs> | null
  }


  /**
   * Model FuelInventory
   */

  export type AggregateFuelInventory = {
    _count: FuelInventoryCountAggregateOutputType | null
    _avg: FuelInventoryAvgAggregateOutputType | null
    _sum: FuelInventorySumAggregateOutputType | null
    _min: FuelInventoryMinAggregateOutputType | null
    _max: FuelInventoryMaxAggregateOutputType | null
  }

  export type FuelInventoryAvgAggregateOutputType = {
    available_liters: number | null
    price_per_liter: number | null
    max_capacity: number | null
    low_stock_threshold: number | null
  }

  export type FuelInventorySumAggregateOutputType = {
    available_liters: number | null
    price_per_liter: number | null
    max_capacity: number | null
    low_stock_threshold: number | null
  }

  export type FuelInventoryMinAggregateOutputType = {
    id: string | null
    fuel_type_id: string | null
    station_id: string | null
    available_liters: number | null
    price_per_liter: number | null
    max_capacity: number | null
    low_stock_threshold: number | null
    updated_at: Date | null
  }

  export type FuelInventoryMaxAggregateOutputType = {
    id: string | null
    fuel_type_id: string | null
    station_id: string | null
    available_liters: number | null
    price_per_liter: number | null
    max_capacity: number | null
    low_stock_threshold: number | null
    updated_at: Date | null
  }

  export type FuelInventoryCountAggregateOutputType = {
    id: number
    fuel_type_id: number
    station_id: number
    available_liters: number
    price_per_liter: number
    max_capacity: number
    low_stock_threshold: number
    updated_at: number
    _all: number
  }


  export type FuelInventoryAvgAggregateInputType = {
    available_liters?: true
    price_per_liter?: true
    max_capacity?: true
    low_stock_threshold?: true
  }

  export type FuelInventorySumAggregateInputType = {
    available_liters?: true
    price_per_liter?: true
    max_capacity?: true
    low_stock_threshold?: true
  }

  export type FuelInventoryMinAggregateInputType = {
    id?: true
    fuel_type_id?: true
    station_id?: true
    available_liters?: true
    price_per_liter?: true
    max_capacity?: true
    low_stock_threshold?: true
    updated_at?: true
  }

  export type FuelInventoryMaxAggregateInputType = {
    id?: true
    fuel_type_id?: true
    station_id?: true
    available_liters?: true
    price_per_liter?: true
    max_capacity?: true
    low_stock_threshold?: true
    updated_at?: true
  }

  export type FuelInventoryCountAggregateInputType = {
    id?: true
    fuel_type_id?: true
    station_id?: true
    available_liters?: true
    price_per_liter?: true
    max_capacity?: true
    low_stock_threshold?: true
    updated_at?: true
    _all?: true
  }

  export type FuelInventoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FuelInventory to aggregate.
     */
    where?: FuelInventoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FuelInventories to fetch.
     */
    orderBy?: FuelInventoryOrderByWithRelationInput | FuelInventoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FuelInventoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FuelInventories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FuelInventories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FuelInventories
    **/
    _count?: true | FuelInventoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FuelInventoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FuelInventorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FuelInventoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FuelInventoryMaxAggregateInputType
  }

  export type GetFuelInventoryAggregateType<T extends FuelInventoryAggregateArgs> = {
        [P in keyof T & keyof AggregateFuelInventory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFuelInventory[P]>
      : GetScalarType<T[P], AggregateFuelInventory[P]>
  }




  export type FuelInventoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FuelInventoryWhereInput
    orderBy?: FuelInventoryOrderByWithAggregationInput | FuelInventoryOrderByWithAggregationInput[]
    by: FuelInventoryScalarFieldEnum[] | FuelInventoryScalarFieldEnum
    having?: FuelInventoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FuelInventoryCountAggregateInputType | true
    _avg?: FuelInventoryAvgAggregateInputType
    _sum?: FuelInventorySumAggregateInputType
    _min?: FuelInventoryMinAggregateInputType
    _max?: FuelInventoryMaxAggregateInputType
  }

  export type FuelInventoryGroupByOutputType = {
    id: string
    fuel_type_id: string
    station_id: string
    available_liters: number
    price_per_liter: number
    max_capacity: number
    low_stock_threshold: number
    updated_at: Date
    _count: FuelInventoryCountAggregateOutputType | null
    _avg: FuelInventoryAvgAggregateOutputType | null
    _sum: FuelInventorySumAggregateOutputType | null
    _min: FuelInventoryMinAggregateOutputType | null
    _max: FuelInventoryMaxAggregateOutputType | null
  }

  type GetFuelInventoryGroupByPayload<T extends FuelInventoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FuelInventoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FuelInventoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FuelInventoryGroupByOutputType[P]>
            : GetScalarType<T[P], FuelInventoryGroupByOutputType[P]>
        }
      >
    >


  export type FuelInventorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fuel_type_id?: boolean
    station_id?: boolean
    available_liters?: boolean
    price_per_liter?: boolean
    max_capacity?: boolean
    low_stock_threshold?: boolean
    updated_at?: boolean
    fuel_type?: boolean | FuelTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fuelInventory"]>

  export type FuelInventorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fuel_type_id?: boolean
    station_id?: boolean
    available_liters?: boolean
    price_per_liter?: boolean
    max_capacity?: boolean
    low_stock_threshold?: boolean
    updated_at?: boolean
    fuel_type?: boolean | FuelTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fuelInventory"]>

  export type FuelInventorySelectScalar = {
    id?: boolean
    fuel_type_id?: boolean
    station_id?: boolean
    available_liters?: boolean
    price_per_liter?: boolean
    max_capacity?: boolean
    low_stock_threshold?: boolean
    updated_at?: boolean
  }

  export type FuelInventoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fuel_type?: boolean | FuelTypeDefaultArgs<ExtArgs>
  }
  export type FuelInventoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fuel_type?: boolean | FuelTypeDefaultArgs<ExtArgs>
  }

  export type $FuelInventoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FuelInventory"
    objects: {
      fuel_type: Prisma.$FuelTypePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fuel_type_id: string
      station_id: string
      available_liters: number
      price_per_liter: number
      max_capacity: number
      low_stock_threshold: number
      updated_at: Date
    }, ExtArgs["result"]["fuelInventory"]>
    composites: {}
  }

  type FuelInventoryGetPayload<S extends boolean | null | undefined | FuelInventoryDefaultArgs> = $Result.GetResult<Prisma.$FuelInventoryPayload, S>

  type FuelInventoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FuelInventoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FuelInventoryCountAggregateInputType | true
    }

  export interface FuelInventoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FuelInventory'], meta: { name: 'FuelInventory' } }
    /**
     * Find zero or one FuelInventory that matches the filter.
     * @param {FuelInventoryFindUniqueArgs} args - Arguments to find a FuelInventory
     * @example
     * // Get one FuelInventory
     * const fuelInventory = await prisma.fuelInventory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FuelInventoryFindUniqueArgs>(args: SelectSubset<T, FuelInventoryFindUniqueArgs<ExtArgs>>): Prisma__FuelInventoryClient<$Result.GetResult<Prisma.$FuelInventoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one FuelInventory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FuelInventoryFindUniqueOrThrowArgs} args - Arguments to find a FuelInventory
     * @example
     * // Get one FuelInventory
     * const fuelInventory = await prisma.fuelInventory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FuelInventoryFindUniqueOrThrowArgs>(args: SelectSubset<T, FuelInventoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FuelInventoryClient<$Result.GetResult<Prisma.$FuelInventoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first FuelInventory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuelInventoryFindFirstArgs} args - Arguments to find a FuelInventory
     * @example
     * // Get one FuelInventory
     * const fuelInventory = await prisma.fuelInventory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FuelInventoryFindFirstArgs>(args?: SelectSubset<T, FuelInventoryFindFirstArgs<ExtArgs>>): Prisma__FuelInventoryClient<$Result.GetResult<Prisma.$FuelInventoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first FuelInventory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuelInventoryFindFirstOrThrowArgs} args - Arguments to find a FuelInventory
     * @example
     * // Get one FuelInventory
     * const fuelInventory = await prisma.fuelInventory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FuelInventoryFindFirstOrThrowArgs>(args?: SelectSubset<T, FuelInventoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__FuelInventoryClient<$Result.GetResult<Prisma.$FuelInventoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more FuelInventories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuelInventoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FuelInventories
     * const fuelInventories = await prisma.fuelInventory.findMany()
     * 
     * // Get first 10 FuelInventories
     * const fuelInventories = await prisma.fuelInventory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fuelInventoryWithIdOnly = await prisma.fuelInventory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FuelInventoryFindManyArgs>(args?: SelectSubset<T, FuelInventoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FuelInventoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a FuelInventory.
     * @param {FuelInventoryCreateArgs} args - Arguments to create a FuelInventory.
     * @example
     * // Create one FuelInventory
     * const FuelInventory = await prisma.fuelInventory.create({
     *   data: {
     *     // ... data to create a FuelInventory
     *   }
     * })
     * 
     */
    create<T extends FuelInventoryCreateArgs>(args: SelectSubset<T, FuelInventoryCreateArgs<ExtArgs>>): Prisma__FuelInventoryClient<$Result.GetResult<Prisma.$FuelInventoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many FuelInventories.
     * @param {FuelInventoryCreateManyArgs} args - Arguments to create many FuelInventories.
     * @example
     * // Create many FuelInventories
     * const fuelInventory = await prisma.fuelInventory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FuelInventoryCreateManyArgs>(args?: SelectSubset<T, FuelInventoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FuelInventories and returns the data saved in the database.
     * @param {FuelInventoryCreateManyAndReturnArgs} args - Arguments to create many FuelInventories.
     * @example
     * // Create many FuelInventories
     * const fuelInventory = await prisma.fuelInventory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FuelInventories and only return the `id`
     * const fuelInventoryWithIdOnly = await prisma.fuelInventory.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FuelInventoryCreateManyAndReturnArgs>(args?: SelectSubset<T, FuelInventoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FuelInventoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a FuelInventory.
     * @param {FuelInventoryDeleteArgs} args - Arguments to delete one FuelInventory.
     * @example
     * // Delete one FuelInventory
     * const FuelInventory = await prisma.fuelInventory.delete({
     *   where: {
     *     // ... filter to delete one FuelInventory
     *   }
     * })
     * 
     */
    delete<T extends FuelInventoryDeleteArgs>(args: SelectSubset<T, FuelInventoryDeleteArgs<ExtArgs>>): Prisma__FuelInventoryClient<$Result.GetResult<Prisma.$FuelInventoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one FuelInventory.
     * @param {FuelInventoryUpdateArgs} args - Arguments to update one FuelInventory.
     * @example
     * // Update one FuelInventory
     * const fuelInventory = await prisma.fuelInventory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FuelInventoryUpdateArgs>(args: SelectSubset<T, FuelInventoryUpdateArgs<ExtArgs>>): Prisma__FuelInventoryClient<$Result.GetResult<Prisma.$FuelInventoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more FuelInventories.
     * @param {FuelInventoryDeleteManyArgs} args - Arguments to filter FuelInventories to delete.
     * @example
     * // Delete a few FuelInventories
     * const { count } = await prisma.fuelInventory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FuelInventoryDeleteManyArgs>(args?: SelectSubset<T, FuelInventoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FuelInventories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuelInventoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FuelInventories
     * const fuelInventory = await prisma.fuelInventory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FuelInventoryUpdateManyArgs>(args: SelectSubset<T, FuelInventoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FuelInventory.
     * @param {FuelInventoryUpsertArgs} args - Arguments to update or create a FuelInventory.
     * @example
     * // Update or create a FuelInventory
     * const fuelInventory = await prisma.fuelInventory.upsert({
     *   create: {
     *     // ... data to create a FuelInventory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FuelInventory we want to update
     *   }
     * })
     */
    upsert<T extends FuelInventoryUpsertArgs>(args: SelectSubset<T, FuelInventoryUpsertArgs<ExtArgs>>): Prisma__FuelInventoryClient<$Result.GetResult<Prisma.$FuelInventoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of FuelInventories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuelInventoryCountArgs} args - Arguments to filter FuelInventories to count.
     * @example
     * // Count the number of FuelInventories
     * const count = await prisma.fuelInventory.count({
     *   where: {
     *     // ... the filter for the FuelInventories we want to count
     *   }
     * })
    **/
    count<T extends FuelInventoryCountArgs>(
      args?: Subset<T, FuelInventoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FuelInventoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FuelInventory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuelInventoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FuelInventoryAggregateArgs>(args: Subset<T, FuelInventoryAggregateArgs>): Prisma.PrismaPromise<GetFuelInventoryAggregateType<T>>

    /**
     * Group by FuelInventory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FuelInventoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FuelInventoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FuelInventoryGroupByArgs['orderBy'] }
        : { orderBy?: FuelInventoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FuelInventoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFuelInventoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FuelInventory model
   */
  readonly fields: FuelInventoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FuelInventory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FuelInventoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    fuel_type<T extends FuelTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FuelTypeDefaultArgs<ExtArgs>>): Prisma__FuelTypeClient<$Result.GetResult<Prisma.$FuelTypePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FuelInventory model
   */ 
  interface FuelInventoryFieldRefs {
    readonly id: FieldRef<"FuelInventory", 'String'>
    readonly fuel_type_id: FieldRef<"FuelInventory", 'String'>
    readonly station_id: FieldRef<"FuelInventory", 'String'>
    readonly available_liters: FieldRef<"FuelInventory", 'Float'>
    readonly price_per_liter: FieldRef<"FuelInventory", 'Float'>
    readonly max_capacity: FieldRef<"FuelInventory", 'Float'>
    readonly low_stock_threshold: FieldRef<"FuelInventory", 'Float'>
    readonly updated_at: FieldRef<"FuelInventory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FuelInventory findUnique
   */
  export type FuelInventoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelInventory
     */
    select?: FuelInventorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelInventoryInclude<ExtArgs> | null
    /**
     * Filter, which FuelInventory to fetch.
     */
    where: FuelInventoryWhereUniqueInput
  }

  /**
   * FuelInventory findUniqueOrThrow
   */
  export type FuelInventoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelInventory
     */
    select?: FuelInventorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelInventoryInclude<ExtArgs> | null
    /**
     * Filter, which FuelInventory to fetch.
     */
    where: FuelInventoryWhereUniqueInput
  }

  /**
   * FuelInventory findFirst
   */
  export type FuelInventoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelInventory
     */
    select?: FuelInventorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelInventoryInclude<ExtArgs> | null
    /**
     * Filter, which FuelInventory to fetch.
     */
    where?: FuelInventoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FuelInventories to fetch.
     */
    orderBy?: FuelInventoryOrderByWithRelationInput | FuelInventoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FuelInventories.
     */
    cursor?: FuelInventoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FuelInventories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FuelInventories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FuelInventories.
     */
    distinct?: FuelInventoryScalarFieldEnum | FuelInventoryScalarFieldEnum[]
  }

  /**
   * FuelInventory findFirstOrThrow
   */
  export type FuelInventoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelInventory
     */
    select?: FuelInventorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelInventoryInclude<ExtArgs> | null
    /**
     * Filter, which FuelInventory to fetch.
     */
    where?: FuelInventoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FuelInventories to fetch.
     */
    orderBy?: FuelInventoryOrderByWithRelationInput | FuelInventoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FuelInventories.
     */
    cursor?: FuelInventoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FuelInventories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FuelInventories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FuelInventories.
     */
    distinct?: FuelInventoryScalarFieldEnum | FuelInventoryScalarFieldEnum[]
  }

  /**
   * FuelInventory findMany
   */
  export type FuelInventoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelInventory
     */
    select?: FuelInventorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelInventoryInclude<ExtArgs> | null
    /**
     * Filter, which FuelInventories to fetch.
     */
    where?: FuelInventoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FuelInventories to fetch.
     */
    orderBy?: FuelInventoryOrderByWithRelationInput | FuelInventoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FuelInventories.
     */
    cursor?: FuelInventoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FuelInventories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FuelInventories.
     */
    skip?: number
    distinct?: FuelInventoryScalarFieldEnum | FuelInventoryScalarFieldEnum[]
  }

  /**
   * FuelInventory create
   */
  export type FuelInventoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelInventory
     */
    select?: FuelInventorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelInventoryInclude<ExtArgs> | null
    /**
     * The data needed to create a FuelInventory.
     */
    data: XOR<FuelInventoryCreateInput, FuelInventoryUncheckedCreateInput>
  }

  /**
   * FuelInventory createMany
   */
  export type FuelInventoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FuelInventories.
     */
    data: FuelInventoryCreateManyInput | FuelInventoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FuelInventory createManyAndReturn
   */
  export type FuelInventoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelInventory
     */
    select?: FuelInventorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many FuelInventories.
     */
    data: FuelInventoryCreateManyInput | FuelInventoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelInventoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FuelInventory update
   */
  export type FuelInventoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelInventory
     */
    select?: FuelInventorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelInventoryInclude<ExtArgs> | null
    /**
     * The data needed to update a FuelInventory.
     */
    data: XOR<FuelInventoryUpdateInput, FuelInventoryUncheckedUpdateInput>
    /**
     * Choose, which FuelInventory to update.
     */
    where: FuelInventoryWhereUniqueInput
  }

  /**
   * FuelInventory updateMany
   */
  export type FuelInventoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FuelInventories.
     */
    data: XOR<FuelInventoryUpdateManyMutationInput, FuelInventoryUncheckedUpdateManyInput>
    /**
     * Filter which FuelInventories to update
     */
    where?: FuelInventoryWhereInput
  }

  /**
   * FuelInventory upsert
   */
  export type FuelInventoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelInventory
     */
    select?: FuelInventorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelInventoryInclude<ExtArgs> | null
    /**
     * The filter to search for the FuelInventory to update in case it exists.
     */
    where: FuelInventoryWhereUniqueInput
    /**
     * In case the FuelInventory found by the `where` argument doesn't exist, create a new FuelInventory with this data.
     */
    create: XOR<FuelInventoryCreateInput, FuelInventoryUncheckedCreateInput>
    /**
     * In case the FuelInventory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FuelInventoryUpdateInput, FuelInventoryUncheckedUpdateInput>
  }

  /**
   * FuelInventory delete
   */
  export type FuelInventoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelInventory
     */
    select?: FuelInventorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelInventoryInclude<ExtArgs> | null
    /**
     * Filter which FuelInventory to delete.
     */
    where: FuelInventoryWhereUniqueInput
  }

  /**
   * FuelInventory deleteMany
   */
  export type FuelInventoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FuelInventories to delete
     */
    where?: FuelInventoryWhereInput
  }

  /**
   * FuelInventory without action
   */
  export type FuelInventoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FuelInventory
     */
    select?: FuelInventorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FuelInventoryInclude<ExtArgs> | null
  }


  /**
   * Model Supply
   */

  export type AggregateSupply = {
    _count: SupplyCountAggregateOutputType | null
    _avg: SupplyAvgAggregateOutputType | null
    _sum: SupplySumAggregateOutputType | null
    _min: SupplyMinAggregateOutputType | null
    _max: SupplyMaxAggregateOutputType | null
  }

  export type SupplyAvgAggregateOutputType = {
    liters_added: number | null
    cost_price: number | null
  }

  export type SupplySumAggregateOutputType = {
    liters_added: number | null
    cost_price: number | null
  }

  export type SupplyMinAggregateOutputType = {
    id: string | null
    station_id: string | null
    fuel_type_id: string | null
    liters_added: number | null
    cost_price: number | null
    supplied_at: Date | null
  }

  export type SupplyMaxAggregateOutputType = {
    id: string | null
    station_id: string | null
    fuel_type_id: string | null
    liters_added: number | null
    cost_price: number | null
    supplied_at: Date | null
  }

  export type SupplyCountAggregateOutputType = {
    id: number
    station_id: number
    fuel_type_id: number
    liters_added: number
    cost_price: number
    supplied_at: number
    _all: number
  }


  export type SupplyAvgAggregateInputType = {
    liters_added?: true
    cost_price?: true
  }

  export type SupplySumAggregateInputType = {
    liters_added?: true
    cost_price?: true
  }

  export type SupplyMinAggregateInputType = {
    id?: true
    station_id?: true
    fuel_type_id?: true
    liters_added?: true
    cost_price?: true
    supplied_at?: true
  }

  export type SupplyMaxAggregateInputType = {
    id?: true
    station_id?: true
    fuel_type_id?: true
    liters_added?: true
    cost_price?: true
    supplied_at?: true
  }

  export type SupplyCountAggregateInputType = {
    id?: true
    station_id?: true
    fuel_type_id?: true
    liters_added?: true
    cost_price?: true
    supplied_at?: true
    _all?: true
  }

  export type SupplyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Supply to aggregate.
     */
    where?: SupplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Supplies to fetch.
     */
    orderBy?: SupplyOrderByWithRelationInput | SupplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SupplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Supplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Supplies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Supplies
    **/
    _count?: true | SupplyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SupplyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SupplySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SupplyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SupplyMaxAggregateInputType
  }

  export type GetSupplyAggregateType<T extends SupplyAggregateArgs> = {
        [P in keyof T & keyof AggregateSupply]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSupply[P]>
      : GetScalarType<T[P], AggregateSupply[P]>
  }




  export type SupplyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupplyWhereInput
    orderBy?: SupplyOrderByWithAggregationInput | SupplyOrderByWithAggregationInput[]
    by: SupplyScalarFieldEnum[] | SupplyScalarFieldEnum
    having?: SupplyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SupplyCountAggregateInputType | true
    _avg?: SupplyAvgAggregateInputType
    _sum?: SupplySumAggregateInputType
    _min?: SupplyMinAggregateInputType
    _max?: SupplyMaxAggregateInputType
  }

  export type SupplyGroupByOutputType = {
    id: string
    station_id: string
    fuel_type_id: string
    liters_added: number
    cost_price: number | null
    supplied_at: Date
    _count: SupplyCountAggregateOutputType | null
    _avg: SupplyAvgAggregateOutputType | null
    _sum: SupplySumAggregateOutputType | null
    _min: SupplyMinAggregateOutputType | null
    _max: SupplyMaxAggregateOutputType | null
  }

  type GetSupplyGroupByPayload<T extends SupplyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SupplyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SupplyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SupplyGroupByOutputType[P]>
            : GetScalarType<T[P], SupplyGroupByOutputType[P]>
        }
      >
    >


  export type SupplySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    station_id?: boolean
    fuel_type_id?: boolean
    liters_added?: boolean
    cost_price?: boolean
    supplied_at?: boolean
    fuel_type?: boolean | FuelTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supply"]>

  export type SupplySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    station_id?: boolean
    fuel_type_id?: boolean
    liters_added?: boolean
    cost_price?: boolean
    supplied_at?: boolean
    fuel_type?: boolean | FuelTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supply"]>

  export type SupplySelectScalar = {
    id?: boolean
    station_id?: boolean
    fuel_type_id?: boolean
    liters_added?: boolean
    cost_price?: boolean
    supplied_at?: boolean
  }

  export type SupplyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fuel_type?: boolean | FuelTypeDefaultArgs<ExtArgs>
  }
  export type SupplyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fuel_type?: boolean | FuelTypeDefaultArgs<ExtArgs>
  }

  export type $SupplyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Supply"
    objects: {
      fuel_type: Prisma.$FuelTypePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      station_id: string
      fuel_type_id: string
      liters_added: number
      cost_price: number | null
      supplied_at: Date
    }, ExtArgs["result"]["supply"]>
    composites: {}
  }

  type SupplyGetPayload<S extends boolean | null | undefined | SupplyDefaultArgs> = $Result.GetResult<Prisma.$SupplyPayload, S>

  type SupplyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SupplyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SupplyCountAggregateInputType | true
    }

  export interface SupplyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Supply'], meta: { name: 'Supply' } }
    /**
     * Find zero or one Supply that matches the filter.
     * @param {SupplyFindUniqueArgs} args - Arguments to find a Supply
     * @example
     * // Get one Supply
     * const supply = await prisma.supply.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SupplyFindUniqueArgs>(args: SelectSubset<T, SupplyFindUniqueArgs<ExtArgs>>): Prisma__SupplyClient<$Result.GetResult<Prisma.$SupplyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Supply that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SupplyFindUniqueOrThrowArgs} args - Arguments to find a Supply
     * @example
     * // Get one Supply
     * const supply = await prisma.supply.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SupplyFindUniqueOrThrowArgs>(args: SelectSubset<T, SupplyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SupplyClient<$Result.GetResult<Prisma.$SupplyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Supply that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplyFindFirstArgs} args - Arguments to find a Supply
     * @example
     * // Get one Supply
     * const supply = await prisma.supply.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SupplyFindFirstArgs>(args?: SelectSubset<T, SupplyFindFirstArgs<ExtArgs>>): Prisma__SupplyClient<$Result.GetResult<Prisma.$SupplyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Supply that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplyFindFirstOrThrowArgs} args - Arguments to find a Supply
     * @example
     * // Get one Supply
     * const supply = await prisma.supply.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SupplyFindFirstOrThrowArgs>(args?: SelectSubset<T, SupplyFindFirstOrThrowArgs<ExtArgs>>): Prisma__SupplyClient<$Result.GetResult<Prisma.$SupplyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Supplies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Supplies
     * const supplies = await prisma.supply.findMany()
     * 
     * // Get first 10 Supplies
     * const supplies = await prisma.supply.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const supplyWithIdOnly = await prisma.supply.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SupplyFindManyArgs>(args?: SelectSubset<T, SupplyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Supply.
     * @param {SupplyCreateArgs} args - Arguments to create a Supply.
     * @example
     * // Create one Supply
     * const Supply = await prisma.supply.create({
     *   data: {
     *     // ... data to create a Supply
     *   }
     * })
     * 
     */
    create<T extends SupplyCreateArgs>(args: SelectSubset<T, SupplyCreateArgs<ExtArgs>>): Prisma__SupplyClient<$Result.GetResult<Prisma.$SupplyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Supplies.
     * @param {SupplyCreateManyArgs} args - Arguments to create many Supplies.
     * @example
     * // Create many Supplies
     * const supply = await prisma.supply.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SupplyCreateManyArgs>(args?: SelectSubset<T, SupplyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Supplies and returns the data saved in the database.
     * @param {SupplyCreateManyAndReturnArgs} args - Arguments to create many Supplies.
     * @example
     * // Create many Supplies
     * const supply = await prisma.supply.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Supplies and only return the `id`
     * const supplyWithIdOnly = await prisma.supply.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SupplyCreateManyAndReturnArgs>(args?: SelectSubset<T, SupplyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplyPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Supply.
     * @param {SupplyDeleteArgs} args - Arguments to delete one Supply.
     * @example
     * // Delete one Supply
     * const Supply = await prisma.supply.delete({
     *   where: {
     *     // ... filter to delete one Supply
     *   }
     * })
     * 
     */
    delete<T extends SupplyDeleteArgs>(args: SelectSubset<T, SupplyDeleteArgs<ExtArgs>>): Prisma__SupplyClient<$Result.GetResult<Prisma.$SupplyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Supply.
     * @param {SupplyUpdateArgs} args - Arguments to update one Supply.
     * @example
     * // Update one Supply
     * const supply = await prisma.supply.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SupplyUpdateArgs>(args: SelectSubset<T, SupplyUpdateArgs<ExtArgs>>): Prisma__SupplyClient<$Result.GetResult<Prisma.$SupplyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Supplies.
     * @param {SupplyDeleteManyArgs} args - Arguments to filter Supplies to delete.
     * @example
     * // Delete a few Supplies
     * const { count } = await prisma.supply.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SupplyDeleteManyArgs>(args?: SelectSubset<T, SupplyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Supplies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Supplies
     * const supply = await prisma.supply.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SupplyUpdateManyArgs>(args: SelectSubset<T, SupplyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Supply.
     * @param {SupplyUpsertArgs} args - Arguments to update or create a Supply.
     * @example
     * // Update or create a Supply
     * const supply = await prisma.supply.upsert({
     *   create: {
     *     // ... data to create a Supply
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Supply we want to update
     *   }
     * })
     */
    upsert<T extends SupplyUpsertArgs>(args: SelectSubset<T, SupplyUpsertArgs<ExtArgs>>): Prisma__SupplyClient<$Result.GetResult<Prisma.$SupplyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Supplies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplyCountArgs} args - Arguments to filter Supplies to count.
     * @example
     * // Count the number of Supplies
     * const count = await prisma.supply.count({
     *   where: {
     *     // ... the filter for the Supplies we want to count
     *   }
     * })
    **/
    count<T extends SupplyCountArgs>(
      args?: Subset<T, SupplyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SupplyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Supply.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SupplyAggregateArgs>(args: Subset<T, SupplyAggregateArgs>): Prisma.PrismaPromise<GetSupplyAggregateType<T>>

    /**
     * Group by Supply.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SupplyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SupplyGroupByArgs['orderBy'] }
        : { orderBy?: SupplyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SupplyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSupplyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Supply model
   */
  readonly fields: SupplyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Supply.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SupplyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    fuel_type<T extends FuelTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FuelTypeDefaultArgs<ExtArgs>>): Prisma__FuelTypeClient<$Result.GetResult<Prisma.$FuelTypePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Supply model
   */ 
  interface SupplyFieldRefs {
    readonly id: FieldRef<"Supply", 'String'>
    readonly station_id: FieldRef<"Supply", 'String'>
    readonly fuel_type_id: FieldRef<"Supply", 'String'>
    readonly liters_added: FieldRef<"Supply", 'Float'>
    readonly cost_price: FieldRef<"Supply", 'Float'>
    readonly supplied_at: FieldRef<"Supply", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Supply findUnique
   */
  export type SupplyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supply
     */
    select?: SupplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplyInclude<ExtArgs> | null
    /**
     * Filter, which Supply to fetch.
     */
    where: SupplyWhereUniqueInput
  }

  /**
   * Supply findUniqueOrThrow
   */
  export type SupplyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supply
     */
    select?: SupplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplyInclude<ExtArgs> | null
    /**
     * Filter, which Supply to fetch.
     */
    where: SupplyWhereUniqueInput
  }

  /**
   * Supply findFirst
   */
  export type SupplyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supply
     */
    select?: SupplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplyInclude<ExtArgs> | null
    /**
     * Filter, which Supply to fetch.
     */
    where?: SupplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Supplies to fetch.
     */
    orderBy?: SupplyOrderByWithRelationInput | SupplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Supplies.
     */
    cursor?: SupplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Supplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Supplies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Supplies.
     */
    distinct?: SupplyScalarFieldEnum | SupplyScalarFieldEnum[]
  }

  /**
   * Supply findFirstOrThrow
   */
  export type SupplyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supply
     */
    select?: SupplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplyInclude<ExtArgs> | null
    /**
     * Filter, which Supply to fetch.
     */
    where?: SupplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Supplies to fetch.
     */
    orderBy?: SupplyOrderByWithRelationInput | SupplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Supplies.
     */
    cursor?: SupplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Supplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Supplies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Supplies.
     */
    distinct?: SupplyScalarFieldEnum | SupplyScalarFieldEnum[]
  }

  /**
   * Supply findMany
   */
  export type SupplyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supply
     */
    select?: SupplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplyInclude<ExtArgs> | null
    /**
     * Filter, which Supplies to fetch.
     */
    where?: SupplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Supplies to fetch.
     */
    orderBy?: SupplyOrderByWithRelationInput | SupplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Supplies.
     */
    cursor?: SupplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Supplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Supplies.
     */
    skip?: number
    distinct?: SupplyScalarFieldEnum | SupplyScalarFieldEnum[]
  }

  /**
   * Supply create
   */
  export type SupplyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supply
     */
    select?: SupplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplyInclude<ExtArgs> | null
    /**
     * The data needed to create a Supply.
     */
    data: XOR<SupplyCreateInput, SupplyUncheckedCreateInput>
  }

  /**
   * Supply createMany
   */
  export type SupplyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Supplies.
     */
    data: SupplyCreateManyInput | SupplyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Supply createManyAndReturn
   */
  export type SupplyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supply
     */
    select?: SupplySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Supplies.
     */
    data: SupplyCreateManyInput | SupplyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Supply update
   */
  export type SupplyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supply
     */
    select?: SupplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplyInclude<ExtArgs> | null
    /**
     * The data needed to update a Supply.
     */
    data: XOR<SupplyUpdateInput, SupplyUncheckedUpdateInput>
    /**
     * Choose, which Supply to update.
     */
    where: SupplyWhereUniqueInput
  }

  /**
   * Supply updateMany
   */
  export type SupplyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Supplies.
     */
    data: XOR<SupplyUpdateManyMutationInput, SupplyUncheckedUpdateManyInput>
    /**
     * Filter which Supplies to update
     */
    where?: SupplyWhereInput
  }

  /**
   * Supply upsert
   */
  export type SupplyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supply
     */
    select?: SupplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplyInclude<ExtArgs> | null
    /**
     * The filter to search for the Supply to update in case it exists.
     */
    where: SupplyWhereUniqueInput
    /**
     * In case the Supply found by the `where` argument doesn't exist, create a new Supply with this data.
     */
    create: XOR<SupplyCreateInput, SupplyUncheckedCreateInput>
    /**
     * In case the Supply was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SupplyUpdateInput, SupplyUncheckedUpdateInput>
  }

  /**
   * Supply delete
   */
  export type SupplyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supply
     */
    select?: SupplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplyInclude<ExtArgs> | null
    /**
     * Filter which Supply to delete.
     */
    where: SupplyWhereUniqueInput
  }

  /**
   * Supply deleteMany
   */
  export type SupplyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Supplies to delete
     */
    where?: SupplyWhereInput
  }

  /**
   * Supply without action
   */
  export type SupplyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supply
     */
    select?: SupplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplyInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const FuelTypeScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type FuelTypeScalarFieldEnum = (typeof FuelTypeScalarFieldEnum)[keyof typeof FuelTypeScalarFieldEnum]


  export const FuelInventoryScalarFieldEnum: {
    id: 'id',
    fuel_type_id: 'fuel_type_id',
    station_id: 'station_id',
    available_liters: 'available_liters',
    price_per_liter: 'price_per_liter',
    max_capacity: 'max_capacity',
    low_stock_threshold: 'low_stock_threshold',
    updated_at: 'updated_at'
  };

  export type FuelInventoryScalarFieldEnum = (typeof FuelInventoryScalarFieldEnum)[keyof typeof FuelInventoryScalarFieldEnum]


  export const SupplyScalarFieldEnum: {
    id: 'id',
    station_id: 'station_id',
    fuel_type_id: 'fuel_type_id',
    liters_added: 'liters_added',
    cost_price: 'cost_price',
    supplied_at: 'supplied_at'
  };

  export type SupplyScalarFieldEnum = (typeof SupplyScalarFieldEnum)[keyof typeof SupplyScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'FuelTypeName'
   */
  export type EnumFuelTypeNameFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FuelTypeName'>
    


  /**
   * Reference to a field of type 'FuelTypeName[]'
   */
  export type ListEnumFuelTypeNameFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FuelTypeName[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type FuelTypeWhereInput = {
    AND?: FuelTypeWhereInput | FuelTypeWhereInput[]
    OR?: FuelTypeWhereInput[]
    NOT?: FuelTypeWhereInput | FuelTypeWhereInput[]
    id?: StringFilter<"FuelType"> | string
    name?: EnumFuelTypeNameFilter<"FuelType"> | $Enums.FuelTypeName
    inventory?: FuelInventoryListRelationFilter
    supplies?: SupplyListRelationFilter
  }

  export type FuelTypeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    inventory?: FuelInventoryOrderByRelationAggregateInput
    supplies?: SupplyOrderByRelationAggregateInput
  }

  export type FuelTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FuelTypeWhereInput | FuelTypeWhereInput[]
    OR?: FuelTypeWhereInput[]
    NOT?: FuelTypeWhereInput | FuelTypeWhereInput[]
    name?: EnumFuelTypeNameFilter<"FuelType"> | $Enums.FuelTypeName
    inventory?: FuelInventoryListRelationFilter
    supplies?: SupplyListRelationFilter
  }, "id">

  export type FuelTypeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: FuelTypeCountOrderByAggregateInput
    _max?: FuelTypeMaxOrderByAggregateInput
    _min?: FuelTypeMinOrderByAggregateInput
  }

  export type FuelTypeScalarWhereWithAggregatesInput = {
    AND?: FuelTypeScalarWhereWithAggregatesInput | FuelTypeScalarWhereWithAggregatesInput[]
    OR?: FuelTypeScalarWhereWithAggregatesInput[]
    NOT?: FuelTypeScalarWhereWithAggregatesInput | FuelTypeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FuelType"> | string
    name?: EnumFuelTypeNameWithAggregatesFilter<"FuelType"> | $Enums.FuelTypeName
  }

  export type FuelInventoryWhereInput = {
    AND?: FuelInventoryWhereInput | FuelInventoryWhereInput[]
    OR?: FuelInventoryWhereInput[]
    NOT?: FuelInventoryWhereInput | FuelInventoryWhereInput[]
    id?: StringFilter<"FuelInventory"> | string
    fuel_type_id?: StringFilter<"FuelInventory"> | string
    station_id?: StringFilter<"FuelInventory"> | string
    available_liters?: FloatFilter<"FuelInventory"> | number
    price_per_liter?: FloatFilter<"FuelInventory"> | number
    max_capacity?: FloatFilter<"FuelInventory"> | number
    low_stock_threshold?: FloatFilter<"FuelInventory"> | number
    updated_at?: DateTimeFilter<"FuelInventory"> | Date | string
    fuel_type?: XOR<FuelTypeRelationFilter, FuelTypeWhereInput>
  }

  export type FuelInventoryOrderByWithRelationInput = {
    id?: SortOrder
    fuel_type_id?: SortOrder
    station_id?: SortOrder
    available_liters?: SortOrder
    price_per_liter?: SortOrder
    max_capacity?: SortOrder
    low_stock_threshold?: SortOrder
    updated_at?: SortOrder
    fuel_type?: FuelTypeOrderByWithRelationInput
  }

  export type FuelInventoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    station_id_fuel_type_id?: FuelInventoryStation_idFuel_type_idCompoundUniqueInput
    AND?: FuelInventoryWhereInput | FuelInventoryWhereInput[]
    OR?: FuelInventoryWhereInput[]
    NOT?: FuelInventoryWhereInput | FuelInventoryWhereInput[]
    fuel_type_id?: StringFilter<"FuelInventory"> | string
    station_id?: StringFilter<"FuelInventory"> | string
    available_liters?: FloatFilter<"FuelInventory"> | number
    price_per_liter?: FloatFilter<"FuelInventory"> | number
    max_capacity?: FloatFilter<"FuelInventory"> | number
    low_stock_threshold?: FloatFilter<"FuelInventory"> | number
    updated_at?: DateTimeFilter<"FuelInventory"> | Date | string
    fuel_type?: XOR<FuelTypeRelationFilter, FuelTypeWhereInput>
  }, "id" | "station_id_fuel_type_id">

  export type FuelInventoryOrderByWithAggregationInput = {
    id?: SortOrder
    fuel_type_id?: SortOrder
    station_id?: SortOrder
    available_liters?: SortOrder
    price_per_liter?: SortOrder
    max_capacity?: SortOrder
    low_stock_threshold?: SortOrder
    updated_at?: SortOrder
    _count?: FuelInventoryCountOrderByAggregateInput
    _avg?: FuelInventoryAvgOrderByAggregateInput
    _max?: FuelInventoryMaxOrderByAggregateInput
    _min?: FuelInventoryMinOrderByAggregateInput
    _sum?: FuelInventorySumOrderByAggregateInput
  }

  export type FuelInventoryScalarWhereWithAggregatesInput = {
    AND?: FuelInventoryScalarWhereWithAggregatesInput | FuelInventoryScalarWhereWithAggregatesInput[]
    OR?: FuelInventoryScalarWhereWithAggregatesInput[]
    NOT?: FuelInventoryScalarWhereWithAggregatesInput | FuelInventoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FuelInventory"> | string
    fuel_type_id?: StringWithAggregatesFilter<"FuelInventory"> | string
    station_id?: StringWithAggregatesFilter<"FuelInventory"> | string
    available_liters?: FloatWithAggregatesFilter<"FuelInventory"> | number
    price_per_liter?: FloatWithAggregatesFilter<"FuelInventory"> | number
    max_capacity?: FloatWithAggregatesFilter<"FuelInventory"> | number
    low_stock_threshold?: FloatWithAggregatesFilter<"FuelInventory"> | number
    updated_at?: DateTimeWithAggregatesFilter<"FuelInventory"> | Date | string
  }

  export type SupplyWhereInput = {
    AND?: SupplyWhereInput | SupplyWhereInput[]
    OR?: SupplyWhereInput[]
    NOT?: SupplyWhereInput | SupplyWhereInput[]
    id?: StringFilter<"Supply"> | string
    station_id?: StringFilter<"Supply"> | string
    fuel_type_id?: StringFilter<"Supply"> | string
    liters_added?: FloatFilter<"Supply"> | number
    cost_price?: FloatNullableFilter<"Supply"> | number | null
    supplied_at?: DateTimeFilter<"Supply"> | Date | string
    fuel_type?: XOR<FuelTypeRelationFilter, FuelTypeWhereInput>
  }

  export type SupplyOrderByWithRelationInput = {
    id?: SortOrder
    station_id?: SortOrder
    fuel_type_id?: SortOrder
    liters_added?: SortOrder
    cost_price?: SortOrderInput | SortOrder
    supplied_at?: SortOrder
    fuel_type?: FuelTypeOrderByWithRelationInput
  }

  export type SupplyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SupplyWhereInput | SupplyWhereInput[]
    OR?: SupplyWhereInput[]
    NOT?: SupplyWhereInput | SupplyWhereInput[]
    station_id?: StringFilter<"Supply"> | string
    fuel_type_id?: StringFilter<"Supply"> | string
    liters_added?: FloatFilter<"Supply"> | number
    cost_price?: FloatNullableFilter<"Supply"> | number | null
    supplied_at?: DateTimeFilter<"Supply"> | Date | string
    fuel_type?: XOR<FuelTypeRelationFilter, FuelTypeWhereInput>
  }, "id">

  export type SupplyOrderByWithAggregationInput = {
    id?: SortOrder
    station_id?: SortOrder
    fuel_type_id?: SortOrder
    liters_added?: SortOrder
    cost_price?: SortOrderInput | SortOrder
    supplied_at?: SortOrder
    _count?: SupplyCountOrderByAggregateInput
    _avg?: SupplyAvgOrderByAggregateInput
    _max?: SupplyMaxOrderByAggregateInput
    _min?: SupplyMinOrderByAggregateInput
    _sum?: SupplySumOrderByAggregateInput
  }

  export type SupplyScalarWhereWithAggregatesInput = {
    AND?: SupplyScalarWhereWithAggregatesInput | SupplyScalarWhereWithAggregatesInput[]
    OR?: SupplyScalarWhereWithAggregatesInput[]
    NOT?: SupplyScalarWhereWithAggregatesInput | SupplyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Supply"> | string
    station_id?: StringWithAggregatesFilter<"Supply"> | string
    fuel_type_id?: StringWithAggregatesFilter<"Supply"> | string
    liters_added?: FloatWithAggregatesFilter<"Supply"> | number
    cost_price?: FloatNullableWithAggregatesFilter<"Supply"> | number | null
    supplied_at?: DateTimeWithAggregatesFilter<"Supply"> | Date | string
  }

  export type FuelTypeCreateInput = {
    id?: string
    name: $Enums.FuelTypeName
    inventory?: FuelInventoryCreateNestedManyWithoutFuel_typeInput
    supplies?: SupplyCreateNestedManyWithoutFuel_typeInput
  }

  export type FuelTypeUncheckedCreateInput = {
    id?: string
    name: $Enums.FuelTypeName
    inventory?: FuelInventoryUncheckedCreateNestedManyWithoutFuel_typeInput
    supplies?: SupplyUncheckedCreateNestedManyWithoutFuel_typeInput
  }

  export type FuelTypeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: EnumFuelTypeNameFieldUpdateOperationsInput | $Enums.FuelTypeName
    inventory?: FuelInventoryUpdateManyWithoutFuel_typeNestedInput
    supplies?: SupplyUpdateManyWithoutFuel_typeNestedInput
  }

  export type FuelTypeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: EnumFuelTypeNameFieldUpdateOperationsInput | $Enums.FuelTypeName
    inventory?: FuelInventoryUncheckedUpdateManyWithoutFuel_typeNestedInput
    supplies?: SupplyUncheckedUpdateManyWithoutFuel_typeNestedInput
  }

  export type FuelTypeCreateManyInput = {
    id?: string
    name: $Enums.FuelTypeName
  }

  export type FuelTypeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: EnumFuelTypeNameFieldUpdateOperationsInput | $Enums.FuelTypeName
  }

  export type FuelTypeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: EnumFuelTypeNameFieldUpdateOperationsInput | $Enums.FuelTypeName
  }

  export type FuelInventoryCreateInput = {
    id?: string
    station_id: string
    available_liters: number
    price_per_liter: number
    max_capacity?: number
    low_stock_threshold?: number
    updated_at?: Date | string
    fuel_type: FuelTypeCreateNestedOneWithoutInventoryInput
  }

  export type FuelInventoryUncheckedCreateInput = {
    id?: string
    fuel_type_id: string
    station_id: string
    available_liters: number
    price_per_liter: number
    max_capacity?: number
    low_stock_threshold?: number
    updated_at?: Date | string
  }

  export type FuelInventoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    station_id?: StringFieldUpdateOperationsInput | string
    available_liters?: FloatFieldUpdateOperationsInput | number
    price_per_liter?: FloatFieldUpdateOperationsInput | number
    max_capacity?: FloatFieldUpdateOperationsInput | number
    low_stock_threshold?: FloatFieldUpdateOperationsInput | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    fuel_type?: FuelTypeUpdateOneRequiredWithoutInventoryNestedInput
  }

  export type FuelInventoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fuel_type_id?: StringFieldUpdateOperationsInput | string
    station_id?: StringFieldUpdateOperationsInput | string
    available_liters?: FloatFieldUpdateOperationsInput | number
    price_per_liter?: FloatFieldUpdateOperationsInput | number
    max_capacity?: FloatFieldUpdateOperationsInput | number
    low_stock_threshold?: FloatFieldUpdateOperationsInput | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FuelInventoryCreateManyInput = {
    id?: string
    fuel_type_id: string
    station_id: string
    available_liters: number
    price_per_liter: number
    max_capacity?: number
    low_stock_threshold?: number
    updated_at?: Date | string
  }

  export type FuelInventoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    station_id?: StringFieldUpdateOperationsInput | string
    available_liters?: FloatFieldUpdateOperationsInput | number
    price_per_liter?: FloatFieldUpdateOperationsInput | number
    max_capacity?: FloatFieldUpdateOperationsInput | number
    low_stock_threshold?: FloatFieldUpdateOperationsInput | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FuelInventoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fuel_type_id?: StringFieldUpdateOperationsInput | string
    station_id?: StringFieldUpdateOperationsInput | string
    available_liters?: FloatFieldUpdateOperationsInput | number
    price_per_liter?: FloatFieldUpdateOperationsInput | number
    max_capacity?: FloatFieldUpdateOperationsInput | number
    low_stock_threshold?: FloatFieldUpdateOperationsInput | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplyCreateInput = {
    id?: string
    station_id: string
    liters_added: number
    cost_price?: number | null
    supplied_at?: Date | string
    fuel_type: FuelTypeCreateNestedOneWithoutSuppliesInput
  }

  export type SupplyUncheckedCreateInput = {
    id?: string
    station_id: string
    fuel_type_id: string
    liters_added: number
    cost_price?: number | null
    supplied_at?: Date | string
  }

  export type SupplyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    station_id?: StringFieldUpdateOperationsInput | string
    liters_added?: FloatFieldUpdateOperationsInput | number
    cost_price?: NullableFloatFieldUpdateOperationsInput | number | null
    supplied_at?: DateTimeFieldUpdateOperationsInput | Date | string
    fuel_type?: FuelTypeUpdateOneRequiredWithoutSuppliesNestedInput
  }

  export type SupplyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    station_id?: StringFieldUpdateOperationsInput | string
    fuel_type_id?: StringFieldUpdateOperationsInput | string
    liters_added?: FloatFieldUpdateOperationsInput | number
    cost_price?: NullableFloatFieldUpdateOperationsInput | number | null
    supplied_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplyCreateManyInput = {
    id?: string
    station_id: string
    fuel_type_id: string
    liters_added: number
    cost_price?: number | null
    supplied_at?: Date | string
  }

  export type SupplyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    station_id?: StringFieldUpdateOperationsInput | string
    liters_added?: FloatFieldUpdateOperationsInput | number
    cost_price?: NullableFloatFieldUpdateOperationsInput | number | null
    supplied_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    station_id?: StringFieldUpdateOperationsInput | string
    fuel_type_id?: StringFieldUpdateOperationsInput | string
    liters_added?: FloatFieldUpdateOperationsInput | number
    cost_price?: NullableFloatFieldUpdateOperationsInput | number | null
    supplied_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumFuelTypeNameFilter<$PrismaModel = never> = {
    equals?: $Enums.FuelTypeName | EnumFuelTypeNameFieldRefInput<$PrismaModel>
    in?: $Enums.FuelTypeName[] | ListEnumFuelTypeNameFieldRefInput<$PrismaModel>
    notIn?: $Enums.FuelTypeName[] | ListEnumFuelTypeNameFieldRefInput<$PrismaModel>
    not?: NestedEnumFuelTypeNameFilter<$PrismaModel> | $Enums.FuelTypeName
  }

  export type FuelInventoryListRelationFilter = {
    every?: FuelInventoryWhereInput
    some?: FuelInventoryWhereInput
    none?: FuelInventoryWhereInput
  }

  export type SupplyListRelationFilter = {
    every?: SupplyWhereInput
    some?: SupplyWhereInput
    none?: SupplyWhereInput
  }

  export type FuelInventoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SupplyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FuelTypeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type FuelTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type FuelTypeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumFuelTypeNameWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FuelTypeName | EnumFuelTypeNameFieldRefInput<$PrismaModel>
    in?: $Enums.FuelTypeName[] | ListEnumFuelTypeNameFieldRefInput<$PrismaModel>
    notIn?: $Enums.FuelTypeName[] | ListEnumFuelTypeNameFieldRefInput<$PrismaModel>
    not?: NestedEnumFuelTypeNameWithAggregatesFilter<$PrismaModel> | $Enums.FuelTypeName
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFuelTypeNameFilter<$PrismaModel>
    _max?: NestedEnumFuelTypeNameFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type FuelTypeRelationFilter = {
    is?: FuelTypeWhereInput
    isNot?: FuelTypeWhereInput
  }

  export type FuelInventoryStation_idFuel_type_idCompoundUniqueInput = {
    station_id: string
    fuel_type_id: string
  }

  export type FuelInventoryCountOrderByAggregateInput = {
    id?: SortOrder
    fuel_type_id?: SortOrder
    station_id?: SortOrder
    available_liters?: SortOrder
    price_per_liter?: SortOrder
    max_capacity?: SortOrder
    low_stock_threshold?: SortOrder
    updated_at?: SortOrder
  }

  export type FuelInventoryAvgOrderByAggregateInput = {
    available_liters?: SortOrder
    price_per_liter?: SortOrder
    max_capacity?: SortOrder
    low_stock_threshold?: SortOrder
  }

  export type FuelInventoryMaxOrderByAggregateInput = {
    id?: SortOrder
    fuel_type_id?: SortOrder
    station_id?: SortOrder
    available_liters?: SortOrder
    price_per_liter?: SortOrder
    max_capacity?: SortOrder
    low_stock_threshold?: SortOrder
    updated_at?: SortOrder
  }

  export type FuelInventoryMinOrderByAggregateInput = {
    id?: SortOrder
    fuel_type_id?: SortOrder
    station_id?: SortOrder
    available_liters?: SortOrder
    price_per_liter?: SortOrder
    max_capacity?: SortOrder
    low_stock_threshold?: SortOrder
    updated_at?: SortOrder
  }

  export type FuelInventorySumOrderByAggregateInput = {
    available_liters?: SortOrder
    price_per_liter?: SortOrder
    max_capacity?: SortOrder
    low_stock_threshold?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SupplyCountOrderByAggregateInput = {
    id?: SortOrder
    station_id?: SortOrder
    fuel_type_id?: SortOrder
    liters_added?: SortOrder
    cost_price?: SortOrder
    supplied_at?: SortOrder
  }

  export type SupplyAvgOrderByAggregateInput = {
    liters_added?: SortOrder
    cost_price?: SortOrder
  }

  export type SupplyMaxOrderByAggregateInput = {
    id?: SortOrder
    station_id?: SortOrder
    fuel_type_id?: SortOrder
    liters_added?: SortOrder
    cost_price?: SortOrder
    supplied_at?: SortOrder
  }

  export type SupplyMinOrderByAggregateInput = {
    id?: SortOrder
    station_id?: SortOrder
    fuel_type_id?: SortOrder
    liters_added?: SortOrder
    cost_price?: SortOrder
    supplied_at?: SortOrder
  }

  export type SupplySumOrderByAggregateInput = {
    liters_added?: SortOrder
    cost_price?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type FuelInventoryCreateNestedManyWithoutFuel_typeInput = {
    create?: XOR<FuelInventoryCreateWithoutFuel_typeInput, FuelInventoryUncheckedCreateWithoutFuel_typeInput> | FuelInventoryCreateWithoutFuel_typeInput[] | FuelInventoryUncheckedCreateWithoutFuel_typeInput[]
    connectOrCreate?: FuelInventoryCreateOrConnectWithoutFuel_typeInput | FuelInventoryCreateOrConnectWithoutFuel_typeInput[]
    createMany?: FuelInventoryCreateManyFuel_typeInputEnvelope
    connect?: FuelInventoryWhereUniqueInput | FuelInventoryWhereUniqueInput[]
  }

  export type SupplyCreateNestedManyWithoutFuel_typeInput = {
    create?: XOR<SupplyCreateWithoutFuel_typeInput, SupplyUncheckedCreateWithoutFuel_typeInput> | SupplyCreateWithoutFuel_typeInput[] | SupplyUncheckedCreateWithoutFuel_typeInput[]
    connectOrCreate?: SupplyCreateOrConnectWithoutFuel_typeInput | SupplyCreateOrConnectWithoutFuel_typeInput[]
    createMany?: SupplyCreateManyFuel_typeInputEnvelope
    connect?: SupplyWhereUniqueInput | SupplyWhereUniqueInput[]
  }

  export type FuelInventoryUncheckedCreateNestedManyWithoutFuel_typeInput = {
    create?: XOR<FuelInventoryCreateWithoutFuel_typeInput, FuelInventoryUncheckedCreateWithoutFuel_typeInput> | FuelInventoryCreateWithoutFuel_typeInput[] | FuelInventoryUncheckedCreateWithoutFuel_typeInput[]
    connectOrCreate?: FuelInventoryCreateOrConnectWithoutFuel_typeInput | FuelInventoryCreateOrConnectWithoutFuel_typeInput[]
    createMany?: FuelInventoryCreateManyFuel_typeInputEnvelope
    connect?: FuelInventoryWhereUniqueInput | FuelInventoryWhereUniqueInput[]
  }

  export type SupplyUncheckedCreateNestedManyWithoutFuel_typeInput = {
    create?: XOR<SupplyCreateWithoutFuel_typeInput, SupplyUncheckedCreateWithoutFuel_typeInput> | SupplyCreateWithoutFuel_typeInput[] | SupplyUncheckedCreateWithoutFuel_typeInput[]
    connectOrCreate?: SupplyCreateOrConnectWithoutFuel_typeInput | SupplyCreateOrConnectWithoutFuel_typeInput[]
    createMany?: SupplyCreateManyFuel_typeInputEnvelope
    connect?: SupplyWhereUniqueInput | SupplyWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumFuelTypeNameFieldUpdateOperationsInput = {
    set?: $Enums.FuelTypeName
  }

  export type FuelInventoryUpdateManyWithoutFuel_typeNestedInput = {
    create?: XOR<FuelInventoryCreateWithoutFuel_typeInput, FuelInventoryUncheckedCreateWithoutFuel_typeInput> | FuelInventoryCreateWithoutFuel_typeInput[] | FuelInventoryUncheckedCreateWithoutFuel_typeInput[]
    connectOrCreate?: FuelInventoryCreateOrConnectWithoutFuel_typeInput | FuelInventoryCreateOrConnectWithoutFuel_typeInput[]
    upsert?: FuelInventoryUpsertWithWhereUniqueWithoutFuel_typeInput | FuelInventoryUpsertWithWhereUniqueWithoutFuel_typeInput[]
    createMany?: FuelInventoryCreateManyFuel_typeInputEnvelope
    set?: FuelInventoryWhereUniqueInput | FuelInventoryWhereUniqueInput[]
    disconnect?: FuelInventoryWhereUniqueInput | FuelInventoryWhereUniqueInput[]
    delete?: FuelInventoryWhereUniqueInput | FuelInventoryWhereUniqueInput[]
    connect?: FuelInventoryWhereUniqueInput | FuelInventoryWhereUniqueInput[]
    update?: FuelInventoryUpdateWithWhereUniqueWithoutFuel_typeInput | FuelInventoryUpdateWithWhereUniqueWithoutFuel_typeInput[]
    updateMany?: FuelInventoryUpdateManyWithWhereWithoutFuel_typeInput | FuelInventoryUpdateManyWithWhereWithoutFuel_typeInput[]
    deleteMany?: FuelInventoryScalarWhereInput | FuelInventoryScalarWhereInput[]
  }

  export type SupplyUpdateManyWithoutFuel_typeNestedInput = {
    create?: XOR<SupplyCreateWithoutFuel_typeInput, SupplyUncheckedCreateWithoutFuel_typeInput> | SupplyCreateWithoutFuel_typeInput[] | SupplyUncheckedCreateWithoutFuel_typeInput[]
    connectOrCreate?: SupplyCreateOrConnectWithoutFuel_typeInput | SupplyCreateOrConnectWithoutFuel_typeInput[]
    upsert?: SupplyUpsertWithWhereUniqueWithoutFuel_typeInput | SupplyUpsertWithWhereUniqueWithoutFuel_typeInput[]
    createMany?: SupplyCreateManyFuel_typeInputEnvelope
    set?: SupplyWhereUniqueInput | SupplyWhereUniqueInput[]
    disconnect?: SupplyWhereUniqueInput | SupplyWhereUniqueInput[]
    delete?: SupplyWhereUniqueInput | SupplyWhereUniqueInput[]
    connect?: SupplyWhereUniqueInput | SupplyWhereUniqueInput[]
    update?: SupplyUpdateWithWhereUniqueWithoutFuel_typeInput | SupplyUpdateWithWhereUniqueWithoutFuel_typeInput[]
    updateMany?: SupplyUpdateManyWithWhereWithoutFuel_typeInput | SupplyUpdateManyWithWhereWithoutFuel_typeInput[]
    deleteMany?: SupplyScalarWhereInput | SupplyScalarWhereInput[]
  }

  export type FuelInventoryUncheckedUpdateManyWithoutFuel_typeNestedInput = {
    create?: XOR<FuelInventoryCreateWithoutFuel_typeInput, FuelInventoryUncheckedCreateWithoutFuel_typeInput> | FuelInventoryCreateWithoutFuel_typeInput[] | FuelInventoryUncheckedCreateWithoutFuel_typeInput[]
    connectOrCreate?: FuelInventoryCreateOrConnectWithoutFuel_typeInput | FuelInventoryCreateOrConnectWithoutFuel_typeInput[]
    upsert?: FuelInventoryUpsertWithWhereUniqueWithoutFuel_typeInput | FuelInventoryUpsertWithWhereUniqueWithoutFuel_typeInput[]
    createMany?: FuelInventoryCreateManyFuel_typeInputEnvelope
    set?: FuelInventoryWhereUniqueInput | FuelInventoryWhereUniqueInput[]
    disconnect?: FuelInventoryWhereUniqueInput | FuelInventoryWhereUniqueInput[]
    delete?: FuelInventoryWhereUniqueInput | FuelInventoryWhereUniqueInput[]
    connect?: FuelInventoryWhereUniqueInput | FuelInventoryWhereUniqueInput[]
    update?: FuelInventoryUpdateWithWhereUniqueWithoutFuel_typeInput | FuelInventoryUpdateWithWhereUniqueWithoutFuel_typeInput[]
    updateMany?: FuelInventoryUpdateManyWithWhereWithoutFuel_typeInput | FuelInventoryUpdateManyWithWhereWithoutFuel_typeInput[]
    deleteMany?: FuelInventoryScalarWhereInput | FuelInventoryScalarWhereInput[]
  }

  export type SupplyUncheckedUpdateManyWithoutFuel_typeNestedInput = {
    create?: XOR<SupplyCreateWithoutFuel_typeInput, SupplyUncheckedCreateWithoutFuel_typeInput> | SupplyCreateWithoutFuel_typeInput[] | SupplyUncheckedCreateWithoutFuel_typeInput[]
    connectOrCreate?: SupplyCreateOrConnectWithoutFuel_typeInput | SupplyCreateOrConnectWithoutFuel_typeInput[]
    upsert?: SupplyUpsertWithWhereUniqueWithoutFuel_typeInput | SupplyUpsertWithWhereUniqueWithoutFuel_typeInput[]
    createMany?: SupplyCreateManyFuel_typeInputEnvelope
    set?: SupplyWhereUniqueInput | SupplyWhereUniqueInput[]
    disconnect?: SupplyWhereUniqueInput | SupplyWhereUniqueInput[]
    delete?: SupplyWhereUniqueInput | SupplyWhereUniqueInput[]
    connect?: SupplyWhereUniqueInput | SupplyWhereUniqueInput[]
    update?: SupplyUpdateWithWhereUniqueWithoutFuel_typeInput | SupplyUpdateWithWhereUniqueWithoutFuel_typeInput[]
    updateMany?: SupplyUpdateManyWithWhereWithoutFuel_typeInput | SupplyUpdateManyWithWhereWithoutFuel_typeInput[]
    deleteMany?: SupplyScalarWhereInput | SupplyScalarWhereInput[]
  }

  export type FuelTypeCreateNestedOneWithoutInventoryInput = {
    create?: XOR<FuelTypeCreateWithoutInventoryInput, FuelTypeUncheckedCreateWithoutInventoryInput>
    connectOrCreate?: FuelTypeCreateOrConnectWithoutInventoryInput
    connect?: FuelTypeWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FuelTypeUpdateOneRequiredWithoutInventoryNestedInput = {
    create?: XOR<FuelTypeCreateWithoutInventoryInput, FuelTypeUncheckedCreateWithoutInventoryInput>
    connectOrCreate?: FuelTypeCreateOrConnectWithoutInventoryInput
    upsert?: FuelTypeUpsertWithoutInventoryInput
    connect?: FuelTypeWhereUniqueInput
    update?: XOR<XOR<FuelTypeUpdateToOneWithWhereWithoutInventoryInput, FuelTypeUpdateWithoutInventoryInput>, FuelTypeUncheckedUpdateWithoutInventoryInput>
  }

  export type FuelTypeCreateNestedOneWithoutSuppliesInput = {
    create?: XOR<FuelTypeCreateWithoutSuppliesInput, FuelTypeUncheckedCreateWithoutSuppliesInput>
    connectOrCreate?: FuelTypeCreateOrConnectWithoutSuppliesInput
    connect?: FuelTypeWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FuelTypeUpdateOneRequiredWithoutSuppliesNestedInput = {
    create?: XOR<FuelTypeCreateWithoutSuppliesInput, FuelTypeUncheckedCreateWithoutSuppliesInput>
    connectOrCreate?: FuelTypeCreateOrConnectWithoutSuppliesInput
    upsert?: FuelTypeUpsertWithoutSuppliesInput
    connect?: FuelTypeWhereUniqueInput
    update?: XOR<XOR<FuelTypeUpdateToOneWithWhereWithoutSuppliesInput, FuelTypeUpdateWithoutSuppliesInput>, FuelTypeUncheckedUpdateWithoutSuppliesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumFuelTypeNameFilter<$PrismaModel = never> = {
    equals?: $Enums.FuelTypeName | EnumFuelTypeNameFieldRefInput<$PrismaModel>
    in?: $Enums.FuelTypeName[] | ListEnumFuelTypeNameFieldRefInput<$PrismaModel>
    notIn?: $Enums.FuelTypeName[] | ListEnumFuelTypeNameFieldRefInput<$PrismaModel>
    not?: NestedEnumFuelTypeNameFilter<$PrismaModel> | $Enums.FuelTypeName
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumFuelTypeNameWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FuelTypeName | EnumFuelTypeNameFieldRefInput<$PrismaModel>
    in?: $Enums.FuelTypeName[] | ListEnumFuelTypeNameFieldRefInput<$PrismaModel>
    notIn?: $Enums.FuelTypeName[] | ListEnumFuelTypeNameFieldRefInput<$PrismaModel>
    not?: NestedEnumFuelTypeNameWithAggregatesFilter<$PrismaModel> | $Enums.FuelTypeName
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFuelTypeNameFilter<$PrismaModel>
    _max?: NestedEnumFuelTypeNameFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FuelInventoryCreateWithoutFuel_typeInput = {
    id?: string
    station_id: string
    available_liters: number
    price_per_liter: number
    max_capacity?: number
    low_stock_threshold?: number
    updated_at?: Date | string
  }

  export type FuelInventoryUncheckedCreateWithoutFuel_typeInput = {
    id?: string
    station_id: string
    available_liters: number
    price_per_liter: number
    max_capacity?: number
    low_stock_threshold?: number
    updated_at?: Date | string
  }

  export type FuelInventoryCreateOrConnectWithoutFuel_typeInput = {
    where: FuelInventoryWhereUniqueInput
    create: XOR<FuelInventoryCreateWithoutFuel_typeInput, FuelInventoryUncheckedCreateWithoutFuel_typeInput>
  }

  export type FuelInventoryCreateManyFuel_typeInputEnvelope = {
    data: FuelInventoryCreateManyFuel_typeInput | FuelInventoryCreateManyFuel_typeInput[]
    skipDuplicates?: boolean
  }

  export type SupplyCreateWithoutFuel_typeInput = {
    id?: string
    station_id: string
    liters_added: number
    cost_price?: number | null
    supplied_at?: Date | string
  }

  export type SupplyUncheckedCreateWithoutFuel_typeInput = {
    id?: string
    station_id: string
    liters_added: number
    cost_price?: number | null
    supplied_at?: Date | string
  }

  export type SupplyCreateOrConnectWithoutFuel_typeInput = {
    where: SupplyWhereUniqueInput
    create: XOR<SupplyCreateWithoutFuel_typeInput, SupplyUncheckedCreateWithoutFuel_typeInput>
  }

  export type SupplyCreateManyFuel_typeInputEnvelope = {
    data: SupplyCreateManyFuel_typeInput | SupplyCreateManyFuel_typeInput[]
    skipDuplicates?: boolean
  }

  export type FuelInventoryUpsertWithWhereUniqueWithoutFuel_typeInput = {
    where: FuelInventoryWhereUniqueInput
    update: XOR<FuelInventoryUpdateWithoutFuel_typeInput, FuelInventoryUncheckedUpdateWithoutFuel_typeInput>
    create: XOR<FuelInventoryCreateWithoutFuel_typeInput, FuelInventoryUncheckedCreateWithoutFuel_typeInput>
  }

  export type FuelInventoryUpdateWithWhereUniqueWithoutFuel_typeInput = {
    where: FuelInventoryWhereUniqueInput
    data: XOR<FuelInventoryUpdateWithoutFuel_typeInput, FuelInventoryUncheckedUpdateWithoutFuel_typeInput>
  }

  export type FuelInventoryUpdateManyWithWhereWithoutFuel_typeInput = {
    where: FuelInventoryScalarWhereInput
    data: XOR<FuelInventoryUpdateManyMutationInput, FuelInventoryUncheckedUpdateManyWithoutFuel_typeInput>
  }

  export type FuelInventoryScalarWhereInput = {
    AND?: FuelInventoryScalarWhereInput | FuelInventoryScalarWhereInput[]
    OR?: FuelInventoryScalarWhereInput[]
    NOT?: FuelInventoryScalarWhereInput | FuelInventoryScalarWhereInput[]
    id?: StringFilter<"FuelInventory"> | string
    fuel_type_id?: StringFilter<"FuelInventory"> | string
    station_id?: StringFilter<"FuelInventory"> | string
    available_liters?: FloatFilter<"FuelInventory"> | number
    price_per_liter?: FloatFilter<"FuelInventory"> | number
    max_capacity?: FloatFilter<"FuelInventory"> | number
    low_stock_threshold?: FloatFilter<"FuelInventory"> | number
    updated_at?: DateTimeFilter<"FuelInventory"> | Date | string
  }

  export type SupplyUpsertWithWhereUniqueWithoutFuel_typeInput = {
    where: SupplyWhereUniqueInput
    update: XOR<SupplyUpdateWithoutFuel_typeInput, SupplyUncheckedUpdateWithoutFuel_typeInput>
    create: XOR<SupplyCreateWithoutFuel_typeInput, SupplyUncheckedCreateWithoutFuel_typeInput>
  }

  export type SupplyUpdateWithWhereUniqueWithoutFuel_typeInput = {
    where: SupplyWhereUniqueInput
    data: XOR<SupplyUpdateWithoutFuel_typeInput, SupplyUncheckedUpdateWithoutFuel_typeInput>
  }

  export type SupplyUpdateManyWithWhereWithoutFuel_typeInput = {
    where: SupplyScalarWhereInput
    data: XOR<SupplyUpdateManyMutationInput, SupplyUncheckedUpdateManyWithoutFuel_typeInput>
  }

  export type SupplyScalarWhereInput = {
    AND?: SupplyScalarWhereInput | SupplyScalarWhereInput[]
    OR?: SupplyScalarWhereInput[]
    NOT?: SupplyScalarWhereInput | SupplyScalarWhereInput[]
    id?: StringFilter<"Supply"> | string
    station_id?: StringFilter<"Supply"> | string
    fuel_type_id?: StringFilter<"Supply"> | string
    liters_added?: FloatFilter<"Supply"> | number
    cost_price?: FloatNullableFilter<"Supply"> | number | null
    supplied_at?: DateTimeFilter<"Supply"> | Date | string
  }

  export type FuelTypeCreateWithoutInventoryInput = {
    id?: string
    name: $Enums.FuelTypeName
    supplies?: SupplyCreateNestedManyWithoutFuel_typeInput
  }

  export type FuelTypeUncheckedCreateWithoutInventoryInput = {
    id?: string
    name: $Enums.FuelTypeName
    supplies?: SupplyUncheckedCreateNestedManyWithoutFuel_typeInput
  }

  export type FuelTypeCreateOrConnectWithoutInventoryInput = {
    where: FuelTypeWhereUniqueInput
    create: XOR<FuelTypeCreateWithoutInventoryInput, FuelTypeUncheckedCreateWithoutInventoryInput>
  }

  export type FuelTypeUpsertWithoutInventoryInput = {
    update: XOR<FuelTypeUpdateWithoutInventoryInput, FuelTypeUncheckedUpdateWithoutInventoryInput>
    create: XOR<FuelTypeCreateWithoutInventoryInput, FuelTypeUncheckedCreateWithoutInventoryInput>
    where?: FuelTypeWhereInput
  }

  export type FuelTypeUpdateToOneWithWhereWithoutInventoryInput = {
    where?: FuelTypeWhereInput
    data: XOR<FuelTypeUpdateWithoutInventoryInput, FuelTypeUncheckedUpdateWithoutInventoryInput>
  }

  export type FuelTypeUpdateWithoutInventoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: EnumFuelTypeNameFieldUpdateOperationsInput | $Enums.FuelTypeName
    supplies?: SupplyUpdateManyWithoutFuel_typeNestedInput
  }

  export type FuelTypeUncheckedUpdateWithoutInventoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: EnumFuelTypeNameFieldUpdateOperationsInput | $Enums.FuelTypeName
    supplies?: SupplyUncheckedUpdateManyWithoutFuel_typeNestedInput
  }

  export type FuelTypeCreateWithoutSuppliesInput = {
    id?: string
    name: $Enums.FuelTypeName
    inventory?: FuelInventoryCreateNestedManyWithoutFuel_typeInput
  }

  export type FuelTypeUncheckedCreateWithoutSuppliesInput = {
    id?: string
    name: $Enums.FuelTypeName
    inventory?: FuelInventoryUncheckedCreateNestedManyWithoutFuel_typeInput
  }

  export type FuelTypeCreateOrConnectWithoutSuppliesInput = {
    where: FuelTypeWhereUniqueInput
    create: XOR<FuelTypeCreateWithoutSuppliesInput, FuelTypeUncheckedCreateWithoutSuppliesInput>
  }

  export type FuelTypeUpsertWithoutSuppliesInput = {
    update: XOR<FuelTypeUpdateWithoutSuppliesInput, FuelTypeUncheckedUpdateWithoutSuppliesInput>
    create: XOR<FuelTypeCreateWithoutSuppliesInput, FuelTypeUncheckedCreateWithoutSuppliesInput>
    where?: FuelTypeWhereInput
  }

  export type FuelTypeUpdateToOneWithWhereWithoutSuppliesInput = {
    where?: FuelTypeWhereInput
    data: XOR<FuelTypeUpdateWithoutSuppliesInput, FuelTypeUncheckedUpdateWithoutSuppliesInput>
  }

  export type FuelTypeUpdateWithoutSuppliesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: EnumFuelTypeNameFieldUpdateOperationsInput | $Enums.FuelTypeName
    inventory?: FuelInventoryUpdateManyWithoutFuel_typeNestedInput
  }

  export type FuelTypeUncheckedUpdateWithoutSuppliesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: EnumFuelTypeNameFieldUpdateOperationsInput | $Enums.FuelTypeName
    inventory?: FuelInventoryUncheckedUpdateManyWithoutFuel_typeNestedInput
  }

  export type FuelInventoryCreateManyFuel_typeInput = {
    id?: string
    station_id: string
    available_liters: number
    price_per_liter: number
    max_capacity?: number
    low_stock_threshold?: number
    updated_at?: Date | string
  }

  export type SupplyCreateManyFuel_typeInput = {
    id?: string
    station_id: string
    liters_added: number
    cost_price?: number | null
    supplied_at?: Date | string
  }

  export type FuelInventoryUpdateWithoutFuel_typeInput = {
    id?: StringFieldUpdateOperationsInput | string
    station_id?: StringFieldUpdateOperationsInput | string
    available_liters?: FloatFieldUpdateOperationsInput | number
    price_per_liter?: FloatFieldUpdateOperationsInput | number
    max_capacity?: FloatFieldUpdateOperationsInput | number
    low_stock_threshold?: FloatFieldUpdateOperationsInput | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FuelInventoryUncheckedUpdateWithoutFuel_typeInput = {
    id?: StringFieldUpdateOperationsInput | string
    station_id?: StringFieldUpdateOperationsInput | string
    available_liters?: FloatFieldUpdateOperationsInput | number
    price_per_liter?: FloatFieldUpdateOperationsInput | number
    max_capacity?: FloatFieldUpdateOperationsInput | number
    low_stock_threshold?: FloatFieldUpdateOperationsInput | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FuelInventoryUncheckedUpdateManyWithoutFuel_typeInput = {
    id?: StringFieldUpdateOperationsInput | string
    station_id?: StringFieldUpdateOperationsInput | string
    available_liters?: FloatFieldUpdateOperationsInput | number
    price_per_liter?: FloatFieldUpdateOperationsInput | number
    max_capacity?: FloatFieldUpdateOperationsInput | number
    low_stock_threshold?: FloatFieldUpdateOperationsInput | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplyUpdateWithoutFuel_typeInput = {
    id?: StringFieldUpdateOperationsInput | string
    station_id?: StringFieldUpdateOperationsInput | string
    liters_added?: FloatFieldUpdateOperationsInput | number
    cost_price?: NullableFloatFieldUpdateOperationsInput | number | null
    supplied_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplyUncheckedUpdateWithoutFuel_typeInput = {
    id?: StringFieldUpdateOperationsInput | string
    station_id?: StringFieldUpdateOperationsInput | string
    liters_added?: FloatFieldUpdateOperationsInput | number
    cost_price?: NullableFloatFieldUpdateOperationsInput | number | null
    supplied_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplyUncheckedUpdateManyWithoutFuel_typeInput = {
    id?: StringFieldUpdateOperationsInput | string
    station_id?: StringFieldUpdateOperationsInput | string
    liters_added?: FloatFieldUpdateOperationsInput | number
    cost_price?: NullableFloatFieldUpdateOperationsInput | number | null
    supplied_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use FuelTypeCountOutputTypeDefaultArgs instead
     */
    export type FuelTypeCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FuelTypeCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FuelTypeDefaultArgs instead
     */
    export type FuelTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FuelTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FuelInventoryDefaultArgs instead
     */
    export type FuelInventoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FuelInventoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SupplyDefaultArgs instead
     */
    export type SupplyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SupplyDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}