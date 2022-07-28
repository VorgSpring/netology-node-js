const express = require('express');
const fileMiddleware = require('../../middleware/file');
const router = express.Router();

const {Book} = require('../../models');

router.get('/', async (req, res) => {
    const books = await Book.find().select('-__v');
    res.json(books);
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const book = await Book.findById(id).select('-__v');
        res.json(book);
    } catch (e) {
        console.error(e);
        res.status(404).json("book | not found");
    }
});

router.post('/', fileMiddleware.single('book'), async (req, res) => {
    const {
        title, 
        description,
        authors,
        favorite,
        fileCover,
        fileName
    } = req.body;

    const newBook = new Book(
        title, 
        description,
        authors,
        favorite,
        fileCover,
        fileName,
    );

    try {
        await newBook.save();
        res.json(newBook);
    } catch (e) {
        console.error(e);
        res.status(500).json();
    }
});

router.put('/:id', async (req, res) => {
    const {
        title, 
        description,
        authors,
        favorite,
        fileCover,
        fileName
    } = req.body;

    const {id} = req.params;

    try {
        await Book.findByIdAndUpdate(id, {
            title, 
            description,
            authors,
            favorite,
            fileCover,
            fileName
        });
        res.redirect(`/api/book/${id}`);
    } catch (e) {
        console.error(e);
        res.status(500).json();
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        await Book.deleteOne({_id: id});
        res.json(true);
    } catch (e) {
        console.error(e);
        res.status(500).json();
    }
});

// TODO переписать
// router.get('/:id/download', (req, res) => {
//     const {books} = stor;
//     const {id} = req.params;
//     const idx = books.findIndex(el => el.id === id);

//     if (idx !== -1) {
//         res.download(books[idx].fileBook, 'book.pdf', err => {
//             if (err){
//                 res.status(404).json();
//             }
//         });
//     } else {
//         res.status(404);
//         res.json('book | not found');
//     }
// });

module.exports = router;
