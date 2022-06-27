const express = require('express');
const router = express.Router();

const USER = { id: 1, mail: 'test@mail.ru' };

router.get('/login', (req, res) => {
    res.status(201);
    res.json(USER);
});

module.exports = router;
