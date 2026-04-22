import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema({
        fuel_type_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"FuelType",
        required:true
    },
    station_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Station",
        required:true
    },
    driver_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    liters:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["PENDING","COMPLETED","FAILED"],
        default:"PENDING"
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

export default mongoose.model("Transaction",transactionSchema)