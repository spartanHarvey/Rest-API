const express = require('express')
const db = require('./db/connection')

const app = express()


const PORT = 9000

app.get('/', (req,res) =>{

    return res.send("HELLO")

})

app.listen(PORT, async () => {

    await db.connect()
    console.log(`server listening on port ${PORT}`)

})