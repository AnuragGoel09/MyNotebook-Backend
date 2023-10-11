const connectToMongo=require('./db')
const express = require('express')
const UserRoute=require('./routes/auth.js')
connectToMongo();

const app = express()
const port = 5000
app.use(express.json())

app.use('/api/auth',UserRoute)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})