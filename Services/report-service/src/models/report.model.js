import mongoose from "mongoose"

const fuelReportSchema = new mongoose.Schema({
    station_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    fuel_type_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    total_liters_sold:{
        type:Number,
        required:true
    },
    total_amount_sold:{
        type:Number,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model("FuelReport", fuelReportSchema)