const bcrypt = require('bcrypt');
const User=require('../model/user');
const Basket = require('../model/basket');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const clef= 'LE_MBOMIST_CEST_UN_ART';
const newToken = require('../utils');

/* fonction pour obtenir les  */
async function getUserInfo(userId) {
 
  const results = await User.findByPk(userId,{
    include:[{ model:Basket,
               attributes: { exclude: ['id'] }// Exclure l'id de Basket
              }
            ]
  
  });  
  if (results.length === 0) {
    throw new Error("Utilisateur non trouvé.");
  }
  delete results.dataValues.mdp;
  return results.dataValues;
}


async function getAllInfoUser(req,res){
  console.log('recupération de utilisateur', req.params.id);
  try {
    const id = parseInt(req.params.id);

    if(id!==req.auth.userId){
      throw new Error("error id user");
    }
    const userInfo = await getUserInfo(id);// block le fil d'execution de la fonction en attendant de recevoir les données en attendant le thread principal peu faire autre chose
    //const basketItems = await getUserBasket(id); // pareil
    return userInfo;

  } catch (error) {
    if (error.message === "Utilisateur non trouvé.") {
      res.status(404).json({error});
    }else if(error.message ==="error id user"){
      res.status(401).json({error});
    } else {
      console.error(error);
      res.status(500).json({error});
    }
  }
}

  
//obtenir un user par son id
exports.getUserById=async(req,res)=>{
  const response = await getAllInfoUser(req,res)
  res.json(newToken(res,response));
};

// création d'un user
exports.createUser= async (req,res)=>{
  console.log('Tentative de création d’un utilisateur...');
    const {pseudo,mail,mdp, session} = req.body;
    try{
      const hachMdp= await bcrypt.hash(mdp,saltRounds);
      const user = await User.create({
        pseudo: pseudo,
        mail: mail,
        mdp: hachMdp, 
        session: session
      });
      
      // Renvoyer la réponse avec l'utilisateur créé (exclure le mot de passe haché pour la sécurité)
      const newUser = { id: user.id,
      pseudo: user.pseudo,
      mail: user.mail,
      session: user.session
      }
      res.status(201).json(newUser);

    }catch(error){
      console.error(error);
      if (error.code === '23505') {
         const col = (error.constraint==='pseudo_uniq')?'pseudo':'email';
         return res.status(409).send(`changez de ${col} svp`);
      }
        res.status(500).send('Erreur lors de la création de l\'utilisateur.');
   
    }

};

// Générer les tokens
function generateTokens(userId) {
  const accessToken = jwt.sign({ userId:userId}, clef, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId:userId}, clef, { expiresIn: '7d' });
  return { accessToken, refreshToken };
}


exports.userLogin= async(req,res)=>{
  console.log('Tentative de connexion...', req.body);
  try{
    const {mail,mdp}=req.body;
     const user =  await User.findOne({
      where:{mail:mail}
    })

    if (!user) {
      res.status(401).json({message:'Pair mail/mode de passe incorrect'});
    }else{
      const valide = await bcrypt.compare(mdp,user.mdp);
      
      if(!valide){
        res.status(401).json({message:'Pair mail/mode de passe incorrect'});
      }else{ 
        const tokens = generateTokens(user.id);
        req.auth={userId:user.id}//pour getAllInfoUser 
        req.params.id = req.auth.userId;
        const response = await getAllInfoUser(req,res);
        res.cookie('refreshToken',tokens.refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'Strict',
          maxAge: 3 * 24 * 60 * 60 * 1000 // 3 jours
        })
        res.status(200).json({
          ...response,//copie de response
          token: tokens.accessToken
        });
      }
    }
  }catch(error){ 
    res.status(500).json({error});
  }
};


exports.userLogout = async (req,res)=>{
    // Supposons que le refresh token est stocké dans un cookie HttpOnly
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.status(400).json({ message: "No refresh token provided." });
    }
    // Effacer le cookie contenant le refresh token
    res.cookie('refreshToken', '', { httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 0 });
    // Réponse de succès
    res.status(200).json({ message: "Successfully logged out." });
}