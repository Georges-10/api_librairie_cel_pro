const express = require('express');
const router = express.Router();
const bookController= require('../controllers/bookController');

// READ ALL
router.get('/all',bookController.getAllBooks);


router.get('/:id',bookController.getBookById);

module.exports = router;