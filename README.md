# Fonctionnement de l'API


**il manque juste les sessions et l'authentification 
dans le back**

**important à faire**
- tu trouvera un fichier db_backup.sql pour récupérer la sauvegarde de la base de donnée, install pgAdmin 15 ou 16 (j'utilise le 15)
voici: une video qui va te montrer comment importer les tables du backup: https://www.youtube.com/watch?v=JFxY2qajjwA

- pour les image de cover des livre tu dois les mettres dans le dossier **cover_books** j'ai
pas le eu temps de le faire, faudra que tu les nommes comme dans la base de donnée si tu veux le bon lien pour l'affichage

## lancer l'api
- Pour lancer l'api il suffit de lancer dans le terminal:**node api.js**

## Pour les User
 **creation:**
 - endpoint: localhost:3000/api/user/create
 - dans le body mettre un json de la forme: 
 {"pseudo":"user1",
  "mail":"user1@example.com", 
  "mdp": "password123",
  "session": null 
  }
  - le mail et pseudo sont uniques: si tu les duplique tu recevra un message te les indiquants

  **obtenir un user et son panier en fonction de son id :**
 - endpoint: localhost:3000/api/user/[id]
 
 ## Pour les Books

  **obtenir tous les livres :**
  - methode: get
 - endpoint: localhost:3000/api/books/all
 
  **obtenir un livre en fonction de son id :**
    - methode: get
 - endpoint: localhost:3000/api/books/[id]
  
  ## Pour le Panier:
  **Ajouter un livre au panier d'un user**
  - methode: post
  - endpoint: localhost:3000/api/basket/add
  - dans le body mettre un json de la forme: 
  {
    "user_id":1,
    "book_id":4,
    "quantity":1
  }

  **Supprimer un livre du panier**
  - method: delete
  - endpoint:  localhost:3000/api/basket/del
  - dans le body mettre un json de la forme: 
  {
    "user_id":1,
    "book_id":4,
  }

**mettre à jour la quantité d'un livre du panier**

- method: put
- endpoint:  localhost:3000/api/basket/update
- dans le body mettre un json de la forme par exemple: 
  {
    "user_id":1,
    "book_id":4,
    "quantity":2
  }




