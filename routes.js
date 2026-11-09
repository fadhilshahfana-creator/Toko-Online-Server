// LATIHAN 3
/*import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Homepage');
});

router.get('/about', (_, res) => {
    res.send('About page');
});

router.get('/test', (_, res) => {
    res.send('Halaman tidak ditemukan')
})

router.all('/', (_, res) => {
    res.status(405).send('Halaman tidak dapat diakses dengan method teersebut');
});

export default router;
*/

// LATIHAN 5
/*import express from 'express';

const router = express.Router();

router.get('/hello', (req, res) => {
    const { lang } = req.query;

    if (lang ==='id') {
        return res.send('Hai, stranger!');
    }

    res.send('Hello, stranger!');
});

router.get('/hello/:name', (req, res) => {
    const { name } = req.params;
    const { lang } = req.query;

    if (lang === 'id') {
        return res.send(`Hai, ${name}!`);
    }
    res.send(`Hello, ${name}!`);
});

export default router;
*/