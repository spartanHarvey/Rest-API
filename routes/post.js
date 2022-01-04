const router = require('express').Router()
const Post = require('../db/models/Post')
// const Comment = require('../db/models/Comment')
const authMiddleware = require('../middleware/authMiddleware')
const { v4: uuidv4 } = require('uuid');
const pagination = require('../middleware/pagination');
// var moment = require('moment'); 


router.get('/all',authMiddleware, pagination(Post), async(req,res)=> {

    // try{
    //     const posts = await Post.findAll({where: {whoPosted:req.user.id}})
        
    //     if(!posts){
            
    //         return res.status(404).send({"error":"no post was found"});
        
    //     }
        
    //     console.log(posts)
        return res.status(200).send(res.results);

    // }catch(err){

    //     res.status(500).send(err.message);
    // }

});

router.get('/',authMiddleware, async(req,res)=> {

     try{
         const posts = await Post.findOne({where: {id:req.query.post_id}})
         
         if(!posts){
             
             return res.status(404).send({"error":"no post was found"});
         
         }
         
             
         return res.status(200).send(posts);
 
     }catch(err){
 
         res.status(500).send(err.message);
     }
 
 });

router.post('/',authMiddleware, async(req,res) => {

   
    try{
        
        const post =  Post.build({
            id: uuidv4(),
            title: req.body.title,
            description: req.body.description,
            whoPosted:req.user.id
    
        })

        
        post.save();

        return res.status(201).send(post);
    }
    catch(err){

        res.status(500).send(err.message)
    }

   

});


router.put('/',authMiddleware, async (req,res) => {


    try{
        
        const post = await Post.findOne({where: {id:req.query.post_id}})
        const fieldsToBeUpdated = []
        if(req.body.title){post.title = req.body.title; fieldsToBeUpdated.push("title")}
        if(req.body.description){post.description = req.body.description; fieldsToBeUpdated.push("description")}

        
        post.save({fields: fieldsToBeUpdated});
        delete fieldsToBeUpdated;
        return res.status(201).send(post);
    }
    catch(err){

        res.status(500).send(err.message)
    }


})
// router.post('/post/:id/:postid', async(req,res) => {


//     if(!req.session.currentUser){
        
//         if(process.env.NODE_ENV === 'test') return res.status(403).send({"error":"Login first"});
//         return res.redirect(403,`/post/${req.params.id}/${req.params.postid}`, msg={"error":"Login first"});
    
//     }
//     if(Object.keys(req.body).length === 0){ 
//         if(process.env.NODE_ENV === 'test') return res.status(409).send({"error":"empty post"});
//         return res.redirect(403,`/post/${req.params.id}/${req.params.postid}`, msg={"error":"empty post"});

//     }

    
    
//     try{
//         const oldPost = await Post.findById(req.params.postid)
//         if(!oldPost){ 
//             if(process.env.NODE_ENV === 'test') 
            
//             return res.status(404).send({"error":"post not found"}); 
        
//         }
//         if(req.params.id != oldPost['whoPosted'] ) { 
            
            
//             res.status(403).send({"error":"Dont have permission to edit this post"}); return;}
        
//         const updatedPost= await Post.findByIdAndUpdate(req.params.postid,{$set:req.body},{useFindAndModify: false,new: true});
//         await updatedPost.save();
//         if(process.env.NODE_ENV === 'test') return res.status(201).send(updatedPost);
//         res.redirect(200,'/')
//     }
//     catch(err){

//         res.status(500).send(err.message)
//     }

   

// });

// router.delete('/post/:id/:postid', async (req,res) => {


//     const post = await Post.findById(req.params.postid)
//     if(!post){ res.status(404).send({"error":"post not found"}); return;}
//     if(req.params.id != post['whoPosted'] ) { res.status(403).send({"error":"Dont have permission to delete this post"}); return;}


//     try{

//         await Post.deleteOne({_id:post._id});
//         res.status(200).send({"msg":'post deleted'});

//     }catch(err){
//         res.status(500).send(err.message);
//     }

// });

module.exports = router;