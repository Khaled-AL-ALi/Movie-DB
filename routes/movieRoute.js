const express = require('express')
const Movie = require('../models/movie')
const router = express.Router()
const movie = require('../models/movie')

router.get('/', async (req, res, next) => {
    movie.find({}, (error, result) => {
        if (error) return next(error)
        res.send(result)
    })
})

router.get('/:id', async (req, res, next) => {
    let { id } = req.params;
    movie.findById(id, (error, result) => {
        if (error) return next(error)
        res.send(result)
    })
})

router.post('/', async (req, res, next) => {
    const mv = new Movie({
        title: req.body.title,
        year: req.body.year,
        rating: req.body.rating
    })
    mv.save({}, (error, result) => {
        if (error) return next(error)
        res.send(result)
    })
})

router.delete('/:id', async (req, res, next) => {
    let { id } = req.params;
    movie.deleteOne({ _id: id }, (error, result) => {
        if (error) return next(error)
        res.send(result)
    })
})

router.put('/:id', async (req, res, next) => {
    const mv = {
        title: req.body.title,
        year: req.body.year,
        rating: req.body.rating
    }
    let { id } = req.params;
    movie.updateOne({ _id: id }, { $set: mv }, (error, result) => {
        if (error) return next(error)
        res.send(result)
    })
})

module.exports = router