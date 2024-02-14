require('dotenv').config()

const express = require('express')

const app = express()

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use()

app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
})