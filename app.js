const express = require('express')

const app = express()


const PORT = 9000

app.get('/', (req,res) =>{

    return res.send("HELLO")

})

app.listen(PORT,() => {

    console.log(`server listening on port ${PORT}`)

})