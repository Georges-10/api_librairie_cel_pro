const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const cookieParser = require('cookie-parser');

// Importer les contrôleurs
const bookRouter = require('./routes/book');
const userRouter = require('./routes/user');
const basketRouter = require('./routes/basket');

app.use(express.json()); // Middleware pour parser le JSON
app.use(cookieParser());
const options = {
  key: fs.readFileSync('../../certificatsSSL/localhost-key.pem'),
  cert: fs.readFileSync('../../certificatsSSL/localhost.pem')
};

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


// Utiliser les contrôleurs avec des chemins de base spécifiques
app.use('/api/books', bookRouter);
app.use('/api/user', userRouter);
app.use('/api/basket', basketRouter);


const port = 443;

https.createServer(options,app).listen(port,()=>{

 
  console.log(`Server Secure running on https://localhost:${port}`)
  console.log('Lancement de l\'API...');
  console.log("API created by the Cell Pro CEO and co founder of MBOMA_ITECH");
  console.log("\n\nendpoint disponible...");
  // Pour les Users
console.log('Création d’un utilisateur : POST /api/user/create, body {pseudo, mail, mdp, session}');
console.log('Obtenir un user et son panier en fonction de son id : GET /api/user/:id');

// Pour les Books
console.log('Obtenir tous les livres : GET /api/books/all');
console.log('Obtenir un livre en fonction de son id : GET /api/books/:id');

// Pour le Panier
console.log('Ajouter un livre au panier d\'un user : POST /api/basket/add, body {user_id, book_id, quantity}');
console.log('Supprimer un livre du panier : DELETE /api/basket/del, body {user_id, book_id}');
console.log('Mettre à jour la quantité d\'un livre du panier : PUT /api/basket/update, body {user_id, book_id, quantity}');


})

//app.listen(port, () =>{});