require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')


app.use (express.json())
app.use(cors())

//mongoDB connection string
const url = `mongodb+srv://${process.env.MONGODB_ATLAS_USERNAME}:${process.env.MONGODB_ATLAS_PASSWORD}@cluster0-rmxc3.mongodb.net/test?retryWrites=true&w=majority`

const usersRouter = require('./routes/user')
app.use('/user', usersRouter)

// const parksRouter = require('./routes/park')
// app.use('/park', parksRouter)

mongoose.connect(url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(5000);
        console.log('database connected')
    })
    .catch(err => console.log(err))

    mongoose.set('useCreateIndex', true)
