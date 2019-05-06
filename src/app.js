import 'dotenv/config';

import express from 'express';

const app = express();

app.listen(process.env.PORT, () => {
    console.log('Running STREAM-LIMITER App...');
    console.log(`Max Streams for Basic User: ${process.env.BASIC_USER_MAX_STREAMS}`); 
});
