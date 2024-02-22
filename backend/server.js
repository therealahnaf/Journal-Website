require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const messagesRoutes = require('./routes/messages')
const cors = require('cors')

const app = express()

app.use(cors({
    origin:'http://localhost:3000',
    methods:["GET","POST"]
}))

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes

app.use('/api/user', userRoutes)

app.use('/api/messages', messagesRoutes)


// connect to db

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
