
const Books=require('../model/book');
exports.getAllBooks = async (req, res)=>{

  console.log('Récupération de tous les livres');
  try{
    const results = await Books.findAll({
      order:[['id', 'ASC']]
    })
  /*   const results  = await pool.query('SELECT * FROM books ORDER BY id ASC'); */
    res.status(200).json(results);
  }catch(error){

    res.status(400).send(error);
  }
 

}

exports.getBookById= async (req,res)=>{
  console.log('Récupération du livres',req.params.id);
  const id = parseInt(req.params.id);
  try{
    const results = await Books.findByPk(id);
  /* const results = await pool.query('SELECT * FROM books WHERE id = $1;',[id]); */

   res.status(200).json(results);
  }catch(error){
    return res.status(400).send(error);
  }
}






