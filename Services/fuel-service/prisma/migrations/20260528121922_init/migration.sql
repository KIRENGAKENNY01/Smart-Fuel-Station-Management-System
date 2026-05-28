-- CreateEnum
CREATE TYPE "FuelTypeName" AS ENUM ('PETROL', 'DIESEL');

-- CreateTable
CREATE TABLE "fuel_types" (
    "_id" TEXT NOT NULL,
    "name" "FuelTypeName" NOT NULL,

    CONSTRAINT "fuel_types_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "fuel_inventory" (
    "_id" TEXT NOT NULL,
    "fuel_type_id" TEXT NOT NULL,
    "station_id" TEXT NOT NULL,
    "available_liters" DOUBLE PRECISION NOT NULL,
    "price_per_liter" DOUBLE PRECISION NOT NULL,
    "max_capacity" DOUBLE PRECISION NOT NULL DEFAULT 10000,
    "low_stock_threshold" DOUBLE PRECISION NOT NULL DEFAULT 500,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fuel_inventory_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "supplies" (
    "_id" TEXT NOT NULL,
    "station_id" TEXT NOT NULL,
    "fuel_type_id" TEXT NOT NULL,
    "liters_added" DOUBLE PRECISION NOT NULL,
    "cost_price" DOUBLE PRECISION,
    "supplied_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "supplies_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "fuel_inventory_station_id_fuel_type_id_key" ON "fuel_inventory"("station_id", "fuel_type_id");

-- AddForeignKey
ALTER TABLE "fuel_inventory" ADD CONSTRAINT "fuel_inventory_fuel_type_id_fkey" FOREIGN KEY ("fuel_type_id") REFERENCES "fuel_types"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplies" ADD CONSTRAINT "supplies_fuel_type_id_fkey" FOREIGN KEY ("fuel_type_id") REFERENCES "fuel_types"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
