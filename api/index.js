import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import HttpException  from './src/utilities/http-exception.js'
import errorMiddleware from './src/middleware/error.js'
import router from './src/routes/index.js'

const app = express()

app.use(express.json())

if (process.env.CORS_ENABLED === 'true') 
    app.use(cors({
        origin: (process.env.CORS_ORIGIN).split(','),
        methods: (process.env.CORS_METHODS).split(','),
    }))

app.use(express.urlencoded({ extended: true, }))
app.get("/", (req, res) => res.json({ message: "ok" }))
app.use("/api", router)

// 404 error
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found')
    next(err)
})

// Error middleware
app.use(errorMiddleware)

app.listen(process.env.API_PORT ?? 3000, () => console.log(`listening at http://localhost:${process.env.API_PORT ?? 3000}`))