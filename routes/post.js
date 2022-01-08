const router = require('express').Router()
const Post = require('../db/models/Post')
const authMiddleware = require('../middleware/authMiddleware')
const { v4: uuidv4 } = require('uuid');
const pagination = require('../middleware/pagination');
const moment = require('moment')

router.get('/all',authMiddleware, pagination(Post), async(req,res)=> {


    return res.status(200).send(res.results);

});

router.get('/',authMiddleware, async(req,res)=> {

    if(!req.query.post_id) return res.send({"error":"missing post id"})

     try{
         const post = await Post.findOne({where: {id:req.query.post_id}})
         
         if(!post){
             
             return res.status(404).send({"error":"no post was found"});
         
         }
         
        let createdAt =  moment(post.dataValues.createdAt).fromNow()
        const postWithTime = {...post.dataValues, createdAt };
         
         return res.status(200).send(postWithTime);
 
     }catch(err){
 
         res.status(500).send(err.message);
     }
 
 });

router.post('/',authMiddleware, async(req,res) => {

    if (!req.body.title || !req.body.description) return res.send({"error":"missing fields"})

    try{
        
        const post =  Post.build({
            id: uuidv4(),
            title: req.body.title,
            description: req.body.description,
            ownerId:req.user.id,
            photo: req.files ?[req.files.image] : null
    
        })

        
        post.save();

        return res.status(201).send(post);
    }
    catch(err){

        res.status(500).send(err.message)
    }

   

});


router.put('/',authMiddleware, async (req,res) => {

    if(!req.query.post_id) return res.send({"error":"missing post id"})
    if(!req.body.title || !req.body.description) return res.send({"error":"missing fields"})

    try{
        
        const post = await Post.findOne({where: {id:req.query.post_id}})

        if(!post) return res.send({"error":"invalid post id"})
        const fieldsToBeUpdated = []

        post.title = req.body.title; 
        fieldsToBeUpdated.push("title")

        post.description = req.body.description; 
        fieldsToBeUpdated.push("description")

        post.save({fields: fieldsToBeUpdated});
        
        delete fieldsToBeUpdated;

        return res.status(201).send(post);
    }
    catch(err){

        res.status(500).send(err.message)
    }


})


module.exports = router;