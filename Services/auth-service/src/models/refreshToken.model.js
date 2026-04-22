import mongoose from "mongoose"

const refreshTokenSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"User",
        required:true
    },
    token:{
        type:String,
        required:true,
        unique:true
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    expires_at:{
        type:Date, 
        required:true
    },
    revoked:{
        type:Date
    }
});

export default mongoose.model('refreshToken',refreshTokenSchema)