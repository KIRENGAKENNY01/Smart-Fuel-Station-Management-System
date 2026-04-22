import mongoose from "mongoose"


const supplySchema = new mongoose.Schema({
    station_id: mongoose.Schema.Types.ObjectId,
    fuel_type_id: mongoose.Schema.Types.ObjectId,
    liters_added: Number,
    cost_price: Number, // What the station paid for it
    supplied_at: { type: Date, default: Date.now }
});

export default mongoose.model("Supply",supplySchema)
