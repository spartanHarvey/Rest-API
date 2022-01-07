const express = require('express')
const db = require('./db/connection')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')
const commentRoute = require('./routes/comment')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const User = require('./db/models/User')
const Post= require('./db/models/Post')
const fileUpload = require('express-fileupload')
const config = require('../config')

const PORT = config.port
app.use(cors())
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());


app.get('/', cors(), (req,res)=>{ retun res.send("Welcome to main route")})
app.use('/api/auth',cors(),authRoute);
app.use('/api/posts',cors(),postRoute);
app.use('/api/comments',cors(),commentRoute);

 


     try {
         db.authenticate()
         .then(async () => {

          //  Post.sync()
          //     User.sync()

             console.log('Connection has been established successfully.');
             app.listen(PORT, () => {

                console.log(`server listening on port ${PORT}`)
            
            })


         })
       } catch (error) {
         console.error('Unable to connect to the database:', error);
       }

 
