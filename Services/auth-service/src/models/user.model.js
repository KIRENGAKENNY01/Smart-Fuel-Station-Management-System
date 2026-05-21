import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        full_name:{
            type: String,
            required: true,
            trim : true
        },
        email:{
            type:String,
            required: true, 
            unique: true, 
            lowercase: true , 
            trim: true, 
        },
        role:{
            type:String ,
            enum:["ADMIN","MANAGER","DRIVER"],
            default:"DRIVER"
        },
        status:{
            type:String,
            enum:["ACTIVE","SUSPENDED","PENDING_APPROVAL","REJECTED"],
            default:"ACTIVE"
        },
        station_id:{
            type:mongoose.Schema.Types.ObjectId,
            default:null
        },
        application_message:{
            type:String,
            trim:true,
            default:null
        },
        password:{
            type:String, 
            required:true,
        },
        is_verified:{
            type:Boolean,
            default:false
        },
        created_at:{
            type:Date,
            default:Date.now
        },
        updated_at:{
            type:Date,
            default:Date.now
        }
    },
    {
        timestamp: true,
    }

)

export default mongoose.model("User",userSchema)