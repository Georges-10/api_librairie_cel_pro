const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
 try{
  const token = req.headers.authorization.split(' ')[1];// recupération du token: On transforme en tableau la chaine de caractère representant authorization: 'Barear leToken'.split(' ')=> ['Barear','leToken']
  const decodedToken= jwt.verify(token,'LE_MBOMIST_CEST_UN_ART');
  const userId = decodedToken.userId;
  req.auth= {
    userId: userId
  };
  next();
 }catch(error){
  res.status(401).json({error});
 }
}