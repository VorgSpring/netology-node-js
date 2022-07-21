const express = require('express');
const router = express.Router();
const {Book} = require('../models');

router.get('/', async (req, res) => {
    const books = await Book.find();
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

router.post('/create', async (req, res) => {
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
        res.redirect('/books')
    } catch (e) {
        console.error(e);
        res.status(500).json();
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    let book;

    try {
        book = await Book.findById(id);
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }

    res.render("books/view", {
        title: "Books | view",
        book
    });
});

router.get('/update/:id', async (req, res) => {
    const {id} = req.params;
    let book;

    try {
        book = await Book.findById(id);
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }

    res.render("books/update", {
        title: "Books | view",
        book,
    });
});

router.post('/update/:id', async (req, res) => {
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

    try {
        await Book.findByIdAndUpdate(id, {
            title, 
            description,
            authors,
            favorite,
            fileCover,
            fileName
        });
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }

    res.redirect(`/books/${id}`);
});

router.post('/delete/:id',async  (req, res) => {
    const {id} = req.params;

    try {
        await Book.deleteOne({_id: id});
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }

    res.redirect(`/books`);
});

module.exports = router;

