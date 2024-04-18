const express = require('express');
const router = express.Router();
const basketController= require('../controllers/basketController');
const auth = require('../routes/auth');

// ajout d'un livre dans le panier de l'utilisateur
router.post('/add',auth,basketController.addBookBasket);

//suppression d'un livre du panier
router.delete('/del',auth,basketController.delFromBasket);

//modifier le panier
router.put('/update',auth,basketController.updateBasket);




module.exports = router;