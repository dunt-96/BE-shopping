import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index';

dotenv.config();
const app = express();

const port = process.env.PORT || 3001;

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb' }))
app.use(cors())
app.use(bodyParser.json());
app.use(cookieParser());

router(app);

mongoose.connect(`${process.env.CONNECT_DB}`).then(
    () => {
        console.log('Connect DB success');
    }
).catch((err) => {
    console.log(err);
})


app.listen(port, async () => {
    console.log("listening on port: ", port);
});

