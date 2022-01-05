const moment = require('moment')

 function pagination(model){

    return async (req,res,next) =>{

        let dbFetchResults 
        try{
            dbFetchResults = await model.findAll({where: {owner:req.user.id}})
            
            if(!dbFetchResults){
                
                return res.status(404).send({"error":"no post was found"});
            
            }
            
    
        }catch(err){
    
            res.status(500).send(err.message);
        }
        
        const pageNumber = parseInt(req.query.pageNumber);
        const offSet = parseInt(req.query.offSet)

        const previousPage = (pageNumber - 1) * offSet
        const nextPage = pageNumber * offSet
        const result = {}
        if(previousPage > 0){
            result.previousPage = {
                pageNumber: pageNumber - 1,
                offSet: offSet
            }
        }

        if(nextPage < dbFetchResults.length){
            result.nextPage = {
                pageNumber: pageNumber + 1,
                offSet: offSet
            }
        }

        const dbFetchResultsWithTime = dbFetchResults.map(obj => {

            let createdAt = obj.dataValues.createdAt
            createdAt = moment(obj.createdAt).fromNow()
           
              return {...obj.dataValues, createdAt };
            
          
          });

        result.results = dbFetchResultsWithTime.slice(previousPage,nextPage)
        res.results = result
        next()

    }

}


module.exports = pagination;