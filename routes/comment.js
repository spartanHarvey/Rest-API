const router = require('express').Router()
const Comment = require('../db/models/Comment')
const Post = require('../db/models/Post')
const authMiddleware = require('../middleware/authMiddleware')
const { v4: uuidv4 } = require('uuid');
const pagination = require('../middleware/pagination');
var moment = require('moment'); 


router.get('/all',authMiddleware, pagination(Comment), async(req,res)=> {
   
    // if(!req.results) return res.status(404).send({"error":"no comment was found"});
    return res.status(200).send(res.results);

});

router.get('/',authMiddleware, async(req,res)=> {

    if(!req.query.comment_id) return res.send({"error":"missing comment id"})
     try{
         const comment = await Comment.findOne({where: {id:req.query.comment_id}})
         
         if(!comment){
             
             return res.status(404).send({"error":"no comment was found"});
         
         }
         
        
         return res.status(200).send(comment);
 
     }catch(err){
 
         res.status(500).send(err.message);
     }
 
 });

router.post('/',authMiddleware, async(req,res) => {

    if(!req.query.post_id) return res.send({"error":"missing postid"})

    const count = await Post.count({where:{ id: req.query.post_id}})
    if(count == 0 ) return res.send({"error":"Failed to comment due to post no longer exist"})
    try{
        
        const comment =  Comment.build({
            id: uuidv4(),
            comment: req.body.comment,
            postId: req.query.post_id,
            ownerId:req.user.id
    
        })

        
        comment.save();

        return res.status(201).send(comment);
    }
    catch(err){

        res.status(500).send(err.message)
    }

   

});


router.put('/',authMiddleware, async (req,res) => {

    if(!req.query.comment_id) return res.send({"error":"missing comment id"})
    if(!req.body.comment){ return res.send({"error":"missing fields"})}

    try{
        
        const comment = await Comment.findOne({where: {id:req.query.comment_id}})
        
        if(!comment) return res.send({"error":"invalid comment id"})
        
        const fieldsToBeUpdated = []
        comment.comment = req.body.comment; fieldsToBeUpdated.push("comment")
        comment.save({fields: fieldsToBeUpdated});
        delete fieldsToBeUpdated;
        
        return res.status(201).send(comment);
    }
    catch(err){

        res.status(500).send(err.message)
    }


})

module.exports = router;