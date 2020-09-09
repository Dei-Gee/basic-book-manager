import express, { Request, Response } from 'express';
const router = express.Router();

// Author model
const Author = require('../../models/author.model');

// @route GET api/authors
// @desc Get All Authors
// @access private

router.get('/api/authors', async (req:Request, res:Response) => {
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

router.post('/api/author', async (req:Request, res:Response) => {
    const newAuthor = new Author({
        firstName: req.body.firstName, 
        lastName: req.body.lastName
    });

    await newAuthor.save((err:any) => {
        if (err) {
            res.send(err);
        } else {
            res.send(newAuthor);
        }
    });
});

// @route GET api/author/:id
// @desc GET an Author
// @access private

router.get('/api/author/:id', async (req:Request, res:Response) => {
    await Author.findById(req.params.id)
    .then((author: typeof Author) => res.json(author)).then(() => res.json({success: true}))
    .catch((err: any) => { 
        res.status(404).json({success: false});
        console.log('Author not found!');
    })
});


// @route PUT to api/authors
// @desc UPDATES an Author
// @access private

router.put('/api/author/:id', async(req:Request, res:Response) => {
    const authorId = req.params.id;
    const updateValues = req.body;

    const options = { runValidators: true }

    await Author.findByIdAndUpdate(authorId, updateValues, options, () => res.json()).catch((err: any) => console.log(err));

});


module.exports = router;