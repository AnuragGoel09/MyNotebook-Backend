const connectToMongo=require('./db')
const express = require('express')
const UserRoute=require('./routes/auth.js')
const NotesRoute=require('./routes/note.js')
const CheckListRoute=require('./routes/checklist.js')
const NotebookRoute=require('./routes/notebook')
connectToMongo();

const app = express()
const port = 5000
app.use(express.json())

app.use('/api/auth',UserRoute)
app.use('/api/notes',NotesRoute)
app.use('/api/lists',CheckListRoute)
app.use('/api/notebooks',NotebookRoute)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})