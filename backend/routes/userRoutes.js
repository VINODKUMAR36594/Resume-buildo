import express from 'express'
import {loginUser, registerUser,getUserProfile } from '../controllers/usercontoller.js';
import { protect } from '../middleware/authMiddleware.js';
const userRouter=express.Router();


userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
//user Profile protecetd
userRouter.get('/profile',protect,getUserProfile)



export default userRouter