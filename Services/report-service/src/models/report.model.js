import { createModel } from "@smart-fuel/shared/config/postgresModel.js";

export default createModel({
  table: "fuel_reports",
  columns: [
    "_id",
    "station_id",
    "fuel_type_id",
    "total_liters_sold",
    "total_amount_sold",
    "created_at",
    "updated_at",
  ],
});
