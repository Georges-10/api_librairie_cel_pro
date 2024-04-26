const Basket = require('../model/basket');
const newToken = require('../utils');


exports.addBookBasket = async (req, res) => {
  console.log('AJOUT d’un livre dans un panier', req.body);
  const { user_id, book_id, quantity } = req.body;// recupération du contenu du body de la requete
  try{
    if(user_id!==req.auth.userId){
      throw new Error("error id user");
    }
      const newBasket = await Basket.create({
        user_id: user_id,
        book_id: book_id,
        quantity: quantity||1, 
      });
  
    res.status(201).json(newToken(res,newBasket));
  }catch(error){
    if(error.message ==="error id user"){
     return res.status(401).json({error});
    }
    return res.status(400).send(error);
  }
};    


//function utilitaire pour eviter de dupliquer du code dans les routes de suppression et maj du panier
async function deleteFromBasket(user_id, book_id, res) {
  try{
    const result = await Basket.destroy({
      where: { user_id : user_id, book_id: book_id }
    })
    const mess = (result==0)?'Aucune entrée trouvée à supprimer.'
                :`book with book_id: ${book_id} has been deleted of basket  user_id: ${user_id}.`
    res.status(200).json(newToken(res,mess));

  }catch(error){
        return res.status(400).send(error);
  };
}

//suppression d'un livre du panier
/*router.delete('/del',auth,*/

exports.delFromBasket = async(req, res) => {
  console.log('suppression d’un livre dans un panier', req.body);
  const { user_id, book_id} = req.body;
  if(user_id!==req.auth.userId){
   res.status(401).json({error:'veuillez vous reconnecter'});
  }else{
    await deleteFromBasket(user_id,book_id,res);
  }
};




// modification de la quantité si dans  la quantité vaut 0 l'article sera supprimé du panier
/*router.put('/update',auth,*/ 

exports.updateBasket = async (req, res) => {
  console.log('modification d’un livre dans un panier', req.body);
  const { user_id, book_id, quantity } = req.body;
  if(user_id!==req.auth.userId){
    throw new Error("error id user token");
  }
  try{
    if(parseInt(quantity) === 0){  // suppression de l'article si la quantité vaut 0  
      await deleteFromBasket(user_id,book_id,res);
    }  
    else{        
      const basket = await Basket.update(
        { quantity: quantity }, // colonne à mettre à jour et nouvelle valeur
        {where: {
            user_id: user_id,
            book_id: book_id
          },
          returning: true, // Seulement pour PostgreSQL, retourne les objets mis à jour
        }
      )
      
      if(basket && basket[0] > 0 && basket[1]) {
        //const updatedItems = results[1].map(item => item.get({ plain: true }));
        res.status(200).json(newToken(res,basket[1]));
      } 
      else { 
        res.status(400).send("Aucune ligne n'a été mise à jour, l'entrée spécifiée n'existe pas");
      } 
    }
  }catch(error){
    if(error.message ==="error id user token"){
       res.status(401).json({error});
    }else{
      console.log(error)
       res.status(400).json(error);
    } 
  }
};

