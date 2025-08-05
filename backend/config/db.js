import mongoose from "mongoose"
export const connectDB=async() =>{
    await mongoose.connect('mongodb+srv://kumarvinod60700:resume594@cluster0.tbbv61p.mongodb.net/RESUME').then(()=>console.log("connected"))
}