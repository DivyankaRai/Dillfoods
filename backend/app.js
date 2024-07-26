const express = require('express')
const router = require('./routes/router')
const cors = require('cors')
var bodyParser = require('body-parser')
const app = express()
require("dotenv").config({ path: '.env'})
const cookie = require('cookie-parser')
require('./db/db')

// const app = express()
// dotenv.config({path:".env"})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cookie())
app.use(cors())
app.use(router)
app.use("/uploads", express.static("./uploads"))


app.listen(8000,()=>{
    console.log("server started")
})
