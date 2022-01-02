
const jwt = require('jsonwebtoken')
const jwtStorage = require('../jwt/jwt')
const config = require('../config')


function authMiddleware (req,res,next) {

    const token = req.headers['auth']
    if(token == null) return res.send({"msg":"You need to login!"})
    if(!jwtStorage.tokenStorage.includes(token)) return res.send({"msg":"Invalid token"})
   
    jwt.verify(token,config.jwt_token, (err, user) => {

        if(err) return res.send(err.message)
        req.user = user
        next()
    })


}

module.exports = authMiddleware;