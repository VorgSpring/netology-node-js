const express = require('express');
const fileMiddleware = require('../../middleware/file');
const router = express.Router();

const {Book} = require('../../models');

const stor = {
    books: [],
};

[1, 2, 3].map(el => {
    const newBook = new Book(
        `book ${el}`,
        `description book ${el}`,
        `authors book ${el}`,
        `favorite book ${el}`,
        `fileCover book ${el}`,
        `fileName book ${el}`
    );
    stor.books.push(newBook);
});

router.get('/', (req, res) => {
    const {books} = stor;
    res.json(books);
});

router.get('/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.json(books[idx]);
    } else {
        res.status(404);
        res.json('book | not found');
    }
});

router.post('/', fileMiddleware.single('book'), (req, res) => {
    const {books} = stor;
    const {
        title, 
        description,
        authors,
        favorite,
        fileCover,
        fileName
    } = req.body;

    const {path} = req.file;

    const newBook = new Book(
        title, 
        description,
        authors,
        favorite,
        fileCover,
        fileName,
        path
    );
    books.push(newBook);

    res.status(201);
    res.json(newBook);
});

router.put('/:id', (req, res) => {
    const {books} = stor;
    const {
        title, 
        description,
        authors,
        favorite,
        fileCover,
        fileName
    } = req.body;

    const {path} = req.file;

    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            title, 
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook: path
        };
        res.json(books[idx]);
    } else {
        res.status(404);
        res.json('book | not found');
    }
});

router.delete('/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.json(true);
    } else {
        res.status(404);
        res.json('book | not found');
    }
});

router.get('/:id/download', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.download(books[idx].fileBook, 'book.pdf', err => {
            if (err){
                res.status(404).json();
            }
        });
    } else {
        res.status(404);
        res.json('book | not found');
    }
});

module.exports = router;
