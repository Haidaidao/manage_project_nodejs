require('dotenv').config()
const express = require('express')
const fileUpload = require('express-fileupload');
const configViewEngine = require('./config/viewEngine')
const apiRoutes = require('./routes/api')
const connection = require('./config/database')

const port = process.env.PORT
const app = express()

// default options
app.use(fileUpload());

app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded( )); //Parse URL-encoded bodies

configViewEngine(app)

app.use('/v1/api', apiRoutes)

// Cú pháp self-running function
;(async () => {
  try{
    // Cách dùng cho mongoose
    await connection()


    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
    
  } catch(error) {
    console.log(error)
  }
  
})()


