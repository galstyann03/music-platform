import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Music Platform API is running',
        timestamp: new Date().toISOString(),
    });
});

app.get('/', (req, res) => {
    res.status(200).json({
        name: 'Music Platform API',
        version: '1.0.0',
        description: 'Spotify-like Music Platform Database System',
    });
});

export default app;
