import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; 


const encryptData = (data) => {
  return new Promise((resolve, reject) => {
      bcrypt.hash(data, 12, (err,hash) => {
      err ? reject(err) : resolve(hash);
      })
  });  
}

const authJWT = (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if(authHeaders) {
      const token = authHeaders.split(' ')[1];
      jwt.verify(token, secret, (err, user) => { 
          if(err){
              return res.sendStatus(403);
          }
          req.user = user;
          next();
      })
  }else{
      res.sendStatus(401);
  }
}

const getToken = (req) => {
  const authHeader = req.headers.authorization ;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const result = '';
      return result;
  }
  const token = authHeader.split(' ')[1];
  return token; 
} 


export {
  encryptData,
  getToken, 
  authJWT,
}