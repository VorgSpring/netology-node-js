const redis = require('redis');
const express = require('express');

const router = express.Router();

const REDIS_URL = process.env.REDIS_URL || "redis://localhost";

const redisClient = redis.createClient({ url: REDIS_URL });

(async () => await redisClient.connect())()

router.get('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const counter = await redisClient.get(id);
        res.json({ id: counter });
    } catch (e) {
        res.status(500).json({ code: 500, message: 'ошибка redis' })
    }
});

router.post('/:id/incr', async (req, res) => {
    const {id} = req.params;

    try {
        const counter = await redisClient.incr(id);
        res.json({ id: counter });
    } catch (e) {
        res.status(500).json({ code: 500, message: 'ошибка redis' })
    }
});

module.exports = router;
