const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');

// GET api/movies
router.get('/movies', movieController.getAllMovies);

// GET api/movies/:movieId
router.get('/movies/:movieId', movieController.getMovieById);

module.exports = router;