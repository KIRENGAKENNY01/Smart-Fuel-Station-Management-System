-- CreateTable
CREATE TABLE "fuel_reports" (
    "_id" TEXT NOT NULL,
    "station_id" TEXT NOT NULL,
    "fuel_type_id" TEXT NOT NULL,
    "total_liters_sold" DOUBLE PRECISION NOT NULL,
    "total_amount_sold" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fuel_reports_pkey" PRIMARY KEY ("_id")
);
