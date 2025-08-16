import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


//genrating tokens
const generateToken=(userId)=>{
    return jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:'7d'})
}



export const registerUser= async(req,res)=>{
    try{
        const { name,email,password} =req.body;
        // check user exist 
        const userExists= await User.findOne({email})
        if(userExists){
            return res.status(400).json({message:"user already exists"})
        }
        if(password.length<8){
            return res.status(400).json({sucess:false,message:"Password must be atleast 8 Characters"})

        }
        const salt=await bcrypt.genSalt(10);
        const hashedpassword =await bcrypt.hash(password,salt)
       //user creation
        const user =await User.create({
            name,
            email,
            password:hashedpassword,
        })
        res.status(201).json({

            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })

    }
    catch(error){
        res.status(500).json({
            message:"Server error",
            error:error.message
        })
    }
}
export const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
            return res.status(500).json({message:"Invalid emial or password"})
            const isMatch=await bcrypt.compare(password,user.password)
            if(!isMatch){
                return res.status(500).json({
                    message:"Password misMatched"
                })

            }
            res.status(201).json({

            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
        }
        }

    
    catch(error){
        res.status(500).json({
            message:"Server error",
            error:error.message
        })
    }
}
//GETUSER FUCNTIONexport 
export const getUserProfile=async(req,res)=>{
    try {
        const user=await User.findById(req.user.id).select("-password")
        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }
        res.json(user);
    } catch (error) {
         res.status(500).json({
            message:"Server error",
            error:error.message
        })
    }
}