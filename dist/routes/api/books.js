"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Book model
const Book = require('../../models/book.model');
// @route GET api/books
// @desc Get All books
// @access public
router.get('/books', (req, res) => {
    Book.find()
        .sort({ date: -1 })
        .then((books) => {
        console.log(books);
        res.json(books);
    });
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
    newBook.save((err) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(newBook);
        }
    });
});
// @route GET api/book/:id
// @desc GET a Book
// @access private
router.get('/book/:id', (req, res) => {
    Book.findById(req.params.id)
        .then((book) => res.json(book)).then(() => res.json({ success: true }))
        .catch((err) => {
        res.json({ success: false });
        console.log('Book not found!');
        console.log(err);
    });
});
// @route PUT to api/books
// @desc UPDATES a Book
// @access private
router.put('/book/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    const updateValues = req.body;
    const options = { runValidators: true };
    yield Book.findByIdAndUpdate(bookId, updateValues, options, () => res.json()).catch((err) => console.log(err));
}));
module.exports = router;
