import 'dotenv/config';

import express from 'express';
import routes from './routes';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/stream-count/:userId', routes.streamCountChecker);

app.listen(process.env.PORT, () => {
    console.log('Running STREAM-LIMITER App...');
    console.log(`Max Streams for Basic User: ${process.env.BASIC_USER_MAX_STREAMS}`); 
});
