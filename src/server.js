const app = require('./app');
const routes = require('./routes/movie.routes');

const PORT = process.env.PORT || 3000;

app.use('/api/v1', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API endpoint: http://localhost:${PORT}/api/v1/movies`);
});