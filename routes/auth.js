const router = require('express').Router()
const User = require('../db/models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const config = require('../config')
const jwtStorage = require('../jwt/jwt');
const authMiddleware = require('../middleware/authMiddleware');
const { v4: uuidv4 } = require('uuid');

router.post('/register', async (req,res)=>{

    const newUser = User.build({
        id: uuidv4(),
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

 
    try{
        
        const user = await User.findOne({ where: {email:newUser.email}})

        if(user){ 
            
            return res.status(409).send({"error":"Email taken"})
           
        
        };
        newUser.password = await bcrypt.hash(newUser.password, 10);  
        newUser.save();
        
       return res.status(201).send(newUser);
        
    
        
    }catch(err){

       res.status(500).send(err.message)

    }
    
    


});


router.post('/login', async(req,res,next)=>{
     
    const email = req.body.email;
    const password = req.body.password;
    
    if(!email || !password) {
        

        return res.status(409).send({"error":"missing fields"});
    
    }


    
    
    try{
        const user = await User.findOne({where: {email:email}});
      
        if(!user){
           
            return res.status(404).send({"error":'account no found'});
          
                    
        }
        const validPassword = await bcrypt.compare(password, user.password)
        

        if(validPassword) {
                
            const token = jwt.sign(user.dataValues,config.jwt_token)
            jwtStorage.tokenStorage.push(token)
            console.log(jwtStorage.tokenStorage)
            return res.status(200).send({"msg":"logged in",token});
               
        }
        else{
            return res.status(400).send({"error":'wrong password'});
                      
        }

    }catch(err){

        res.status(400).send(err.message);

    }

    

});



router.get('/logout',authMiddleware, (req, res) => {

    const token = req.headers['auth']
    jwtStorage.tokenStorage = jwtStorage.tokenStorage.filter(item =>{ return item != token})

    res.send({"msg":"you have logout successfully!"})
});



module.exports = router;