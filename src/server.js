require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const { MongoClient } = require('mongodb')
const fileUpload = require('express-fileupload');
const configViewEngine = require('./config/viewEngine')
const apiRoutes = require('./routes/api')
const connection = require('./config/database')

const port = process.env.PORT
const app = express()

// default options
app.use(fileUpload());

app.use(express.json( )); // Used to parse JSON bodies
app.use(express.urlencoded( )); //Parse URL-encoded bodies

configViewEngine(app)

app.use('/v1/api', apiRoutes)

// const cat = new Kitten({ name: 'Hai123' });
// cat.save();

// Cú pháp self-running function
;(async () => {
  try{
    // Cách dùng cho mongoose
    await connection()

    //Cách dùng MongoDB Driver
    // const url = process.env.DB_HOST_WITH_DRIVER
    // const client = new MongoClient(url)

    // const dbName = process.env.DB_NAME

    // await client.connect()
    // console.log('Connected successfully to server')
    // const db = client.db(dbName)
    // const collection = db.collection('customers')
    // collection.insertOne({name: 'Hải', 'address': 'ewfsfe'})

    // const findResult = await collection.find({}).toArray();
    // console.log('Found documents =>', findResult);

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
    
  } catch(error) {
    console.log(error)
  }
  
})()


