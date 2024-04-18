const Sequelize = require('sequelize');
// Configuration de la connexion à la base de données
/* const pool = new db.Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'Barcelona10',
  database: 'librairie'
}); */
const poolSequelize = new Sequelize('librairie', 'postgres', 'Barcelona10', {
  host: 'localhost',
  dialect: 'postgres'
});

poolSequelize
  .authenticate()
  .then(() => {
    console.log('Connexion établie avec succès.');
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données:', err);
  });

 
  poolSequelize.sync({ force: false }) // `force: true` va supprimer les tables existantes
  .then(() => {
    console.log('Les tables ont été synchronisées.');
  }).catch((error) => {
    console.error('Une erreur s\'est produite lors de la synchronisation des modèles:', error);
  });
   
//Connexion à la db
/* 
pool.connect((err,client,release)=>{
    if(err){
      return console.log(`Erreur de connexion à la base de données ${err.message} : stack: ${err.stack}` );
    }
    console.log("connection à db réussi!!");
}) */


module.exports = {poolSequelize,Sequelize};