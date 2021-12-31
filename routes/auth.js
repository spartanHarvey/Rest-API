const router = require('express').Router()
const User = require('../db/models/User')
const bcrypt = require('bcryptjs');


//register route
router.post('/register', async (req,res)=>{

    const newUser = await User.build({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

 
    
    try{
        
        const user = await User.findAll({ where: {email:newUser.email}})

        if(user.length > 0 ){ 
            
            return res.status(409).send({"error":"Email taken"})
           
        
        };
        // req.session['currentUser'] = newUser;
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
    
    // if(!email || !password) {res.status(409).send({"error":"missing fields"}); return;}
    if(!email || !password) {
        

        if(process.env.NODE_ENV === 'test') return res.status(409).send({"error":"missing fields"});
        res.redirect('/'); return;
    
    }


    
    
    try{
        const user = await User.findOne({email:email});
      
        if(!user){
           
            if(process.env.NODE_ENV === 'test') return res.status(404).send({"error":'account no found'});
           return res.redirect('/');
                    
        }
        const validPassword = await bcrypt.compare(password, user.password)
        

            if(validPassword) {
                
                req.session['currentUser'] = user; 
                
                // req.session.save()
                if(process.env.NODE_ENV === 'test') return res.status(200).send({"msg":"logged in",user});
                // res.status(200).send(req.session);
                res.redirect(`/home/${user._id}`);
            }
        else{
            if(process.env.NODE_ENV === 'test') return res.status(400).send({"error":'wrong password'});
            res.redirect('/');

            return;
        }

    }catch(err){

        console.log(err);
        res.status(404).send(err);

    }

    

});



router.get('/logout', (req, res) => {

    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }

        if(process.env.NODE_ENV === 'test') return res.status(200).send({"msg":"logged out"});
        res.redirect('/');
    });
});



module.exports = router;