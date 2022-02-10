import express from 'express'
import { getOffset, emptyOrRows } from './helper.js'
import router from './routes/table.js'

const app = express()
const port = 3000

app.use(express.json())

app.use(express.urlencoded({ extended: true, }))
app.get("/", (req, res) => res.json({ message: "ok" }))
app.use("/joealdproj", router)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  console.error(err.message, err.stack)
  res.status(statusCode).json({ message: err.message })
  return
})

app.listen(port, () => console.log(`listening at http://localhost:${port}`) )