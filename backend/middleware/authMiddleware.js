import User from '../models/userModel.js'
// filepath: c:\projects\ResumeBuilder\backend\middleware\authMiddleware.jsimport jwt from 'jsonwebtoken.js'
import jwt from 'jsonwebtoken'


export const protect =async(req,res,next)=>{
    try {
        let token=req.headers.authorization;
        if(token && token.startsWith("Bearer")){
            token=token.split(" ")[1];
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            req.user=await User.findById(decoded.id).select('-password')
            next();
        }
        else{
            res.status(401).json({
                Message:"Not Authorized,no token generated"
            })
        }
    } catch (error) {
         res.status(401).json({
            message:"Token failed",
            error:error.message
        })
    }
}