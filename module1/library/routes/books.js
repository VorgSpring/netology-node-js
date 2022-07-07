const express = require('express');
const router = express.Router();
const {Book} = require('../models');

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
    res.render("books/index", {
        title: "Books",
        books: books,
    });
});

router.get('/create', (req, res) => {
    res.render("books/create", {
        title: "Books | create",
        book: {},
    });
});

router.post('/create', (req, res) => {
    const {books} = stor;
    const {
        title, 
        description,
        authors,
        favorite,
        fileCover,
        fileName
    } = req.body;

    const newbooks = new Book(
        title, 
        description,
        authors,
        favorite,
        fileCover,
        fileName,
    );
    books.push(newbooks);

    res.redirect('/books')
});

router.get('/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.render("books/view", {
            title: "Books | view",
            book: books[idx],
        });
    } else {
        res.status(404).redirect('/404');
    }
});

router.get('/update/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.render("books/update", {
            title: "Books | view",
            book: books[idx],
        });
    } else {
        res.status(404).redirect('/404');
    }
});

router.post('/update/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const {
        title, 
        description,
        authors,
        favorite,
        fileCover,
        fileName
    } = req.body;

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
        };
        res.redirect(`/books/${id}`);
    } else {
        res.status(404).redirect('/404');
    }
});

router.post('/delete/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.redirect(`/books`);
    } else {
        res.status(404).redirect('/404');
    }
});

module.exports = router;

