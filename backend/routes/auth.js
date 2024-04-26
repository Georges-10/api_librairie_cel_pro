const jwt = require('jsonwebtoken');


const clef= 'LE_MBOMIST_CEST_UN_ART';

function VerifAccessToken(req){
  if (!req.headers.authorization) throw new Error("No authorization header provided");
  const token = req.headers.authorization.split(' ')[1];
    const decodedToken= jwt.verify(token,clef);
    const userId = decodedToken.userId;
    req.auth= {userId: userId};
}

//function permettant de vérifier et de rafréchir un token acess plus valide
function verifOrCreateAccessTokenRefreshed(req,res,next,userId){
  try{
      VerifAccessToken(req);
  }catch(err){
    if (err instanceof jwt.JsonWebTokenError) {
      const accessToken = jwt.sign( {userId:userId},clef, { expiresIn: '15m' });
      res.locals.accessToken = accessToken;  // Store the new token in res.locals
      req.auth= {userId: userId};
      console.log("on est bon")

     // next(); 
    }else{
      res.status(500).json({ error: "An unexpected error occurred" });    }
  }
}

function webAppTraitement(req,res,next,refreshToken){
    if (!refreshToken) {
      console.log("Invalid or expired refresh token, please log in again");
        throw new Error("Refresh Token is missing");
    }
    const decodedToken = jwt.verify(refreshToken, clef); 
    const userId = decodedToken.userId;
    verifOrCreateAccessTokenRefreshed(req, res, next,userId);
  
}




function AppMobileTraitement(req,res,refreshToken){
  
  /*if(!refreshToken){
    // faire le generate token si le user est actif (c'est à dire il ne s'est pas logout)
  }
  else{
    try{
      //vérifier que le refresh token est valide 
    }catch(err){

    }
    //veri
  }*/

}


module.exports = (req,res,next)=>{
  try{
    const refreshToken = req.cookies ? req.cookies['refreshToken'] : null;
    const isMobile = req.headers['user-agent'].includes("Mobile");
  // TODO: mettre une vérification si le user est connecté ou il s'est logout , si il  non connecté declencher l'exception 
  if(isMobile){
      AppMobileTraitement(req,res,refreshToken);
    }else{
      webAppTraitement(req,res,next,refreshToken);
    }
    next();
  }catch(err){
    console.log(err);
    res.status(401).send('reconnectez vous svp: '+err.message);
  }
}