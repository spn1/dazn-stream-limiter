import 'dotenv/config';

import express from 'express';
import routes from './routes';

const app = express();
const PORT = process.env.PORT;

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.use('/stream-count/:userId', routes.streamCountChecker);

app.listen(PORT, () => {
    console.log(`Running STREAM-LIMITER App on PORT ${PORT}`);
});
