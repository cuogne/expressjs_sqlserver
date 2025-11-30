const app = require('./app');
const routes = require('./routes/studentRoutes');
const db = require('./config/configDatabase');

const PORT = process.env.PORT || 3000;

app.use('/api', routes);

async function startServer() {
    try {
        // start server
        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`API endpoint: http://localhost:${PORT}/api/students`);
        });

        server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.error(`Port ${PORT} is already in use. Please use a different port.`);
            } else {
                console.error('Server error:', error);
            }
            process.exit(1);
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

process.on('SIGINT', async () => {
    console.log('\nShutting down gracefully...');
    try {
        await db.close();
    } catch (err) {
        console.error('Error closing database:', err);
    }
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\nShutting down gracefully...');
    try {
        await db.close();
    } catch (err) {
        console.error('Error closing database:', err);
    }
    process.exit(0);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

startServer();