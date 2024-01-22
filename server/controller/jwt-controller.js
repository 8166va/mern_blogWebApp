import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const authenticateToken=(req,res,next)=>{
   const  extractToken =(req)=> {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
   const token=extractToken(req);
if(token==null)
{
   return res.status(401).json({msg:'token is missing'});
}
jwt.verify(token,process.env.ACCESS_SECRET_KEY,(error,user)=>{
    if(error){
        return res.status(403).json(error);
    }
    req.user=user;
    next();
})
}