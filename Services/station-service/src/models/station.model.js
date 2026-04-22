import mongoose from "mongoose";

const stationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  // GeoJSON format for "Find Nearby" features
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    }
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE'],
    default: 'ACTIVE'
  },
  manager_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Create a geospatial index for near-by searches
stationSchema.index({ location: "2dsphere" });

export default mongoose.model("Station", stationSchema);