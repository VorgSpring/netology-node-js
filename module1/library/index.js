const express = require('express');
const cors = require('cors');
const formData = require('express-form-data');

const {Book} = require('./models');
const stor = {
    books: [],
};

const USER = { id: 1, mail: 'test@mail.ru' };

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

const app = express();

app.use(formData.parse());
app.use(cors());

app.get('/api/user/login', (req, res) => {
    res.status(201);
    res.json(USER);
});

app.get('/api/books', (req, res) => {
    const {books} = stor;
    res.json(books);
});

app.get('/api/books/:id', (req, res) => {
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

app.post('/api/books/', (req, res) => {
    const {books} = stor;
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
        fileName
    );
    books.push(newBook);

    res.status(201);
    res.json(newBook);
});

app.put('/api/books/:id', (req, res) => {
    const {books} = stor;
    const {title, desc} = req.body;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            title,
            desc,
        };
        res.json(books[idx]);
    } else {
        res.status(404);
        res.json('book | not found');
    }
});

app.delete('/api/books/:id', (req, res) => {
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});