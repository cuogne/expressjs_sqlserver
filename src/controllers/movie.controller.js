const db = require('../config/database.config');

async function getAllMovies(req, res){
    try {
        let query = `select idMovie, title from Movie`

        const result = await db.query(query);

        res.status(200).json({
            data: result.rows,
            count: result.rows.length,
            status: 'success'
        });
    }
    catch(error){
        console.error('Error fetching movies: ', error);
        res.status(500).json({ error: 'Error fetching movies' });
    }
}

async function getMovieById(req, res){
    const movieId = req.params.movieId
    try {
        let query = `select * from Movie where idMovie = @movieId`

        const result = await db.query(query, { movieId });

        if(result.rows.length === 0){
            return res.status(404).json({ 
                error: 'Movie not found' 
            });
        }
        
        res.status(200).json({
            data: result.rows[0],
            status: 'success'
        });
    }
    catch(error){
        console.error('Error fetching movie: ', error);
        res.status(500).json({ error: 'Error fetching movie' });
    }
}

module.exports = {
    getAllMovies,
    getMovieById
}