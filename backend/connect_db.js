const Sequelize = require('sequelize');

const poolSequelize = new Sequelize('tadatabase', 'tonusername', 'tonmdpp', {
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
module.exports = {poolSequelize,Sequelize};
