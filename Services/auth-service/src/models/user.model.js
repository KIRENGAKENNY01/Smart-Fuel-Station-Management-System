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