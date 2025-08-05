import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoutes.js';

const app=express()
const PORT=4000;
app.use(cors())
// connect Db

connectDB()

//connect middle ware
app.use(express.json())

app.use('/api/auth',userRouter)
//roites 

app.get('/',(req,res)=>{
    res.send("API WORKING")
})

app.listen(PORT,()=>{
    console.log(`Server started on http://localhost:${PORT}`)
})