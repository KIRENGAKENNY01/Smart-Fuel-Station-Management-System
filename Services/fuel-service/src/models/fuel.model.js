import mongoose from "mongoose"; 

const fuelTypeSchema= new mongoose.Schema({
    fuelTypes:{
        type:String,
        enum:["DIESEL","PETROL"],
        required:true
    }
})

export default mongoose.model("FuelType",fuelTypeSchema)