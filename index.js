const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.send("Ok");

});

app.get('/test', function (req, res) {
    res.send({ status: 200, message: "ok" });

});
const d = new Date();
let hour = d.getHours();
let minutes = d.getMinutes();
app.get('/time', function (req, res) {
    res.send({ status: 200, message: hour + ':' + minutes });

});

app.get('/hello/:id', function (req, res) {
    res.send({ status: 200, message: `hello ${req.params.id}` },);

});

app.get('/search', function (req, res) {
    let { s } = req.query;
    if (s) return res.send({ status: 200, message: "ok", data: s });
    res.status(500).json({ status: 500, error: true, message: "you have to provide a search" });
});
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
]

app.get('/movies/read', function (req, res) {
    movies.map(value => {
        res.send({ status: 200, data: movies });
    })
})
app.get('/movies/read/by-date', function (req, res) {
    movies.map(value => {
        res.send({ status: 200, data: movies.sort((a, b) => a.year - b.year) });
    })
})
app.get('/movies/read/by-rating', function (req, res) {
    movies.map(value => {
        res.send({ status: 200, data: movies.sort((a, b) => b.rating - a.rating) });
    })
})
function compareTitle(a, b) {
    if (a.title < b.title) {
        return -1;
    }
    if (a.title > b.title) {
        return 1;
    }
    return 0;
}
app.get('/movies/read/by-title', function (req, res) {
    res.send({ status: 200, data: movies.sort(compareTitle) });
})

app.get('/movies/read/id/:id', function (req, res) {
    if (req.params.id <= movies.length) {
        res.send({ status: 200, data: movies[req.params.id - 1] });
    }
    else { res.status(404).json({ status: 404, error: true, message: `the movie ${req.params.id} does not exist` }); }
})

app.post('/movies/add', function (req, res) {
    let title = req.query.title;
    let year = req.query.year;
    let rating = parseInt(req.query.rating) ? req.query.rating : 4;

    if (title && year && !isNaN(year) && year.length == 4) {
        movies.push({ 'title': title, 'year': year, "rating": rating })
        res.send("your movie added succesfuly!")
    }
    else { res.status(403).json({ status: 403, error: true, message: 'you cannot create a movie without providing a title and a year' }) }
})


app.delete('/movies/delete/:id', function (req, res) {
    if (req.params.id <= movies.length) {
        movies.splice(req.params.id - 1, 1);
        movies.map(value => {
            res.send({ status: 200, data: movies });
        })
    }
    else { res.status(404).json({ status: 404, error: true, message: `the movie ${req.params.id} does not exist` }); }
})
app.put('/movies/update/:id', function (req, res) {
    let { title, year, rating } = req.query;
    let id = req.params.id;
    if (req.params.id <= movies.length) {
        if (title) { movies[id - 1].title = title; }
        if (year && !isNaN(year) && year.length == 4) { movies[id - 1].year = year; }
        if (rating && !isNaN(rating) && rating <= 10 && rating >= 0) { movies[id - 1].rating = rating; }

    }
    else { res.status(404).json({ status: 404, error: true, message: `the movie ${req.params.id} does not exist` }); }

    movies.map(value => {
        res.send({ status: 200, data: movies });
    })
})
app.listen(3000);