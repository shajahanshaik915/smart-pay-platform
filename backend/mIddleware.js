const jwt=require('jsonwebtoken');
const JWT_SECRET = require('./config');

//check Headers for the auth,,,, 
///


const authMiddleware=(req,res,next)=>{
    const intialToken=req.headers.authorization;
    if(intialToken){
        const token=intialToken.split(' ')[1];
        try{
            const decoded=jwt.decode(token,JWT_SECRET);
            req.userId=decoded.userId;
            next();
        }
        catch(err){
            return res.status(403).json({msg:"Wrong Token"});
        }
    }
    else{
        res.json({msg:"No Token"});
    }
}
module.exports=authMiddleware;
