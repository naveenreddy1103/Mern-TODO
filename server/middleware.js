const jwt=require('jsonwebtoken');


module.exports=function(req,res,next){
    try{
        const token=req.header('token');
        if(!token){
            return res.send('token not get')
        }
        const decode=jwt.verify(token,'naveen');
        req.user=decode.user;
        next();
    }
    catch(err){
        console.log(err)
    }
}