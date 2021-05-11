const express = require('express');
const router  = express.Router();

const Book = require('../models/Book.model.js')

// GET DISPLAY A FORM
router.get('/books/create', (req, res) => {
  res.render('book-create')
})

// POST SAVE DATA FROM FORM TO DB
router.post('/books/create', (req, res) => {
    const { title, author, description, rating } = req.body
    
    Book.create({
      title,
      author,
      description,
      rating
    }).then((libroCreado) => {
        res.redirect('/books')
    })
    .catch(e => console.log(e))
})


// DISPLAY AN EDIT FORM
// ESTAMOS CREANDO UN FORMULARIO DE EDICIÓN
// NECESITAMOS PASAR LOS DATOS A LA VISTA, PORQUE QUEREMOS QUE CUANDO EDITAMOS SEPAMOS CUALES SON LOS
// DATOS ANTERIORES
router.get('/books/:id/edit', (req,res) => {
  // 1. OBTENER EL ID
  const {id} = req.params

  // 2. ENCONTRAR EN LA BD, A TRAVÉS DEL ID, EL DOCUMENTO QUE NECESITAMOS
  Book.findById(id)
    .then((libroEnEdicion) => {
      console.log(libroEnEdicion)
        // 3. GENERAR LA RESPUESTA DEL SERVIDOR
      res.render('book-edit', {book: libroEnEdicion})
    })
    .catch(e => {
      console.log(e)
      next(e)
    })

})

// ENVIAR LOS DATOS DE EDICIÓN A BASE DE DATOS
router.post('/books/:id/edit', (req, res) => {
  const { id } = req.params
  const {title, description, author, rating} = req.body 

  Book.findByIdAndUpdate(id, {title, description, author, rating}, {new: true})
    .then(libroActualizado => res.redirect(`/books/${libroActualizado.id}`))
    .catch(e => next(e))
} )

/* GET BOOKS */
router.get('/books', (req, res, next) => {
  Book.find({})
    .then((allBooks) => {
      // console.log("Estos son todos los libros:", allBooks)
      res.render('books-list', {
        books: allBooks
      })
    })
    .catch(e => {
      console.log("El error fue:", e)
      next(e)
  })
})


// POST DELETE A BOOK

router.post('/books/:id/delete', (req, res) => {
  const { id } = req.params


  Book.findByIdAndDelete(id)
    .then(() =>  {
        res.redirect('/books')
    })
    .catch(e => next(e))
})









/* GET SINGLE BOOK */
router.get('/books/:bookId', (req, res) => {

  const { bookId } = req.params  

  Book.findById(bookId)
    .then((libroEncontrado) => {
      console.log(libroEncontrado)
      res.render('book-details', {book: libroEncontrado})
    })
    .catch(e => {
      console.log(e)
      next(e)
    })
}) 





module.exports = router;