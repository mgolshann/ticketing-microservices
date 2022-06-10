import express from 'express';

const router = express.Router();


router.get('/api/test', (req, res) => {
    res.status(202).send({ message: 'Router is OK ...'})
});

export { router as testRouter }