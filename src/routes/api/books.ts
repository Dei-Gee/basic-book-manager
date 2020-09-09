import express, { Request, Response } from 'express';
const router = express.Router();

// Book model
const Book = require('../../models/book.model');

// @route GET api/books
// @desc Get All books
// @access public

router.get('/api/books', (req:Request, res:Response) => {
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

router.post('/api/book', (req:Request, res:Response) => {
    const newBook = new Book({
        name: req.body.name, 
        isbn: req.body.isbn, 
        author: req.body.author
    });
    
    newBook.save((err:any) => {
        if (err) {
            res.send(err);
        } else {
            res.send(newBook);
        }
    });
});

// @route GET api/book/:id
// @desc GET a Book
// @access private

router.get('/api/book/:id', (req:Request, res:Response) => {
    Book.findById(req.params.id)
    .then((book: typeof Book) => res.json(book)).then(() => res.json({success: true}))
    .catch((err: any) => { 
        res.json({success: false});
        console.log('Book not found!');
        console.log(err)
    })
});


// @route PUT to api/books
// @desc UPDATES a Book
// @access private

router.put('/api/book/:id', async(req:Request, res:Response) => {
    const bookId = req.params.id;
    const updateValues = req.body;

    const options = { runValidators: true }

    await Book.findByIdAndUpdate(bookId, updateValues, options, () => res.json()).catch((err: any) => console.log(err));

});


module.exports = router;