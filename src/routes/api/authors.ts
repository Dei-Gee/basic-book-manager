import express, { Request, Response } from 'express';
const router = express.Router();

// Author model
const Author = require('../../models/author.model');

// @route GET api/authors
// @desc Get All Authors
// @access private

router.get('/authors', async (req:Request, res:Response) => {
    await Author.find()
    .sort({date: -1})
    .then((authors: Array<typeof Author>) => {
        console.log(authors);
        res.json(authors);
    })
});


// @route POST to api/authors
// @desc ADD a new Author
// @access private

router.post('/author', async (req:Request, res:Response) => {
    const newAuthor = new Author({
        firstName: req.body.firstName, 
        lastName: req.body.lastName
    });

    await newAuthor.save().then((author: typeof Author) => res.json(author));
});

// @route GET api/author/:id
// @desc GET an Author
// @access private

router.get('/author/:id', async (req:Request, res:Response) => {
    await Author.findById(req.params.id)
    .then((author: typeof Author) => res.json(author)).then(() => res.json({success: true}))
    .catch((err: any) => { 
        res.status(404).json({success: false});
        console.log('Author not found!');
    })
});


// @route POST to api/authors
// @desc UPDATES an Author
// @access private




module.exports = router;