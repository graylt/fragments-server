const express = require('express');
const router = express.Router();
const postgres = require('../postgres.js');


router.get('/fragments', (req, res) => {
    postgres.query('SELECT * FROM cms ORDER BY id ASC;', (err, results) => {
        res.json(results.rows)
    });
});

// router.get('/:id', (req, res) => {
//     postgres.query(`SELECT * FROM cms WHERE id = ${req.params.id};`, (err, results) => {
//         res.json(results.rows)
//     });
// });

router.post('/fragments/', (req, res) => {
    postgres.query(`INSERT INTO cms (date, movie, short, tv_series, book, play, short_story) VALUES ('${req.body.date}', '${req.body.movie}', '${req.body.short}', '${req.body.tv_series}', '${req.body.book}', '${req.body.play}', '${req.body.short_story}')`, (err, results) => {
        postgres.query('SELECT * FROM cms ORDER BY id ASC;', (err, results) => {
            if (err) {
                console.log(err);
            } else {
            console.log(req.body);
            res.json(results.rows)
            }
        });
    })
});

router.delete(`/fragments/${id}`, (req, res) => {
    postgres.query(`DELETE FROM cms WHERE id = ${req.params.id};`, (err, results) => {
        postgres.query('SELECT * FROM cms ORDER BY id ASC;', (err, results) => {
            res.json(results.rows)
        });
    });
});

router.put(`/fragments/${id}`, (req, res) => {
    postgres.query(`UPDATE cms SET date = '${req.body.date}', movie = '${req.body.movie}', short = '${req.body.short}', tv_series = '${req.body.tv_series}', book = '${req.body.book}', play = '${req.body.play}', short_story = '${req.body.short_story}' WHERE id = ${req.params.id}`, (err, results) => {
        postgres.query('SELECT * FROM cms ORDER BY id ASC;', (err, results) => {
            res.json(results.rows)
        });
    })
});




module.exports = router