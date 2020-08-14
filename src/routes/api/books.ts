import express, { Request, Response } from 'express';
const router = express.Router();

// Book model
const Book = require('../../models/book.model');

// @route GET api/books
// @desc Get All books
// @access public

router.get('/books', (req:Request, res:Response) => {
    Book.find()
    .sort({date: -1})
    .then((books: Array<typeof Book>) => {
        console.log(books);
        res.json(books);
    })
});


// @route POST to api/books
// @desc ADD a new Book
// @access private

router.post('/book', (req, res) => {
    const newBook = new Book({
        name: req.body.name, 
        isbn: req.body.isbn, 
        author: req.body.author
    });

    newBook.save().then((book: typeof Book) => res.json(book));
});

// @route GET api/book/:id
// @desc GET a Book
// @access private

router.get('/book/:id', (req, res) => {
    Book.findById(req.params.id)
    .then((book: typeof Book) => res.json(book)).then(() => res.json({success: true}))
    .catch((err: any) => { 
        res.json({success: false});
        console.log('Book not found!');
        console.log(err)
    })
});


module.exports = router;