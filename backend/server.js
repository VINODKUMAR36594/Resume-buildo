import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url'; 
import resumeRoutes from './routes/resumeRoutes.js'   

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 4000;
app.use(cors())

// connect Db
connectDB()

//connect middle ware
app.use(express.json())

app.use('/api/auth', userRouter)
//routes 
app.use('/api/resume', resumeRoutes)

app.use('/uploads',
    express.static(path.join(__dirname, 'uploads'), {
        setHeaders: (res, _path) => {
            res.set('Access-Control-Allow-Origin', 'http://localhost:5173     ')
        }
    })
)

app.get('/', (req, res) => {
    res.send("API WORKING")
})

// Optional: global error handler for debugging
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ error: err.message })
})

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})