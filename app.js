import express from 'express'
import { PORT } from './config/env.js'
import carRouter from './routes/cars.routes.js'
import connectToDb from './config/db.js'
const app = express()

app.use(express.json())

app.use("/api/v1/cars", carRouter)
app.listen(PORT, async()=>{
    console.log(`The server is running on port ${PORT}`)
    await connectToDb()
})

export default app