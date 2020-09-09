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
// Author model
const Author = require('../../models/author.model');
// @route GET api/authors
// @desc Get All Authors
// @access private
router.get('/api/authors', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Author.find()
        .sort({ date: -1 })
        .then((authors) => {
        console.log(authors);
        res.json(authors);
    });
}));
// @route POST to api/authors
// @desc ADD a new Author
// @access private
router.post('/api/author', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newAuthor = new Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    yield newAuthor.save((err) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(newAuthor);
        }
    });
}));
// @route GET api/author/:id
// @desc GET an Author
// @access private
router.get('/api/author/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Author.findById(req.params.id)
        .then((author) => res.json(author)).then(() => res.json({ success: true }))
        .catch((err) => {
        res.status(404).json({ success: false });
        console.log('Author not found!');
    });
}));
// @route PUT to api/authors
// @desc UPDATES an Author
// @access private
router.put('/api/author/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authorId = req.params.id;
    const updateValues = req.body;
    const options = { runValidators: true };
    yield Author.findByIdAndUpdate(authorId, updateValues, options, () => res.json()).catch((err) => console.log(err));
}));
module.exports = router;
