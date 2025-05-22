import express from 'express'
import { PORT } from './config/env.js'
import carRouter from './routes/cars.routes.js'
import connectToDb from './config/db.js'
import authRouter from './routes/auth.routes.js'
import companyRouter from './routes/companies.routes.js'
import userRouter from './routes/users.routes.js'
const app = express()

app.use(express.json())


app.use("/api/v1/cars", carRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/companies", companyRouter)
app.use("/api/v1/users", userRouter)
app.listen(PORT, async()=>{
    console.log(`The server is running on port ${PORT}`)
    await connectToDb()
})

export default app