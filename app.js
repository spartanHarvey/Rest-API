const express = require('express')
const db = require('./db/connection')
const authRoute = require('./routes/auth')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');

const PORT = 9000
app.use(cors())
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req,res) =>{

    return res.send("HELLO")

})

app.use('/api/auth',cors(),authRoute);

 


     try {
         db.authenticate()
         .then(() => {

             console.log('Connection has been established successfully.');
             app.listen(PORT, () => {

                console.log(`server listening on port ${PORT}`)
            
            })


         })
       } catch (error) {
         console.error('Unable to connect to the database:', error);
       }

 