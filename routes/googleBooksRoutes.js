const router = require('express').Router()
const axios = require('axios')
const { Book } = require('../models')

router.get('googleBooks/:search',(req,res) => {
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${process.env.GOOGLE_BOOKS_API_KEY}`);
  .then(({ data }) => {
    Book.find()
    .then(books => {
      const booksFiltered = data.items.filter(book => {
        let keep = true
        books.forEach(saved => {
          if (saved.bookId === book.id) {
            keep = false
          }
        })
        return keep
      })
      res.json(booksFiltered)
    })
  })
  .catch(err => console.error(err))
})

module.exports = router