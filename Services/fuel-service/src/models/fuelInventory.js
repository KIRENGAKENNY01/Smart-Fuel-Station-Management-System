import mongoose from "mongoose"


const fuelInventorySchema= new mongoose.Schema({
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
    available_liters:{
        type:Number,
        required:true
    },
    price_per_liter:{
        type:Number,
        required:true
    },
    max_capacity: {
         type: Number, 
         required: true
         },

    low_stock_threshold: { 
        type: Number, 
        default: 500 
    },

    updated_at:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model("FuelInventory",fuelInventorySchema)