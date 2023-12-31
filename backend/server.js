import express from 'express';
import { APP_PORT, DB_URL} from './config';
import routes from './routes';
import errorHandler from './middlewares/errorHandler';
import path from 'path';
import mongoose from 'mongoose';

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', ()=>{
    console.log("DB is connected");
})

global.appRoot = path.resolve(__dirname);

const app = express();

app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.use('/api', routes);
app.use('/uploads', express.static('uploads'));

app.use(errorHandler);

const PORT = process.env.PORT || APP_PORT;
app.listen(PORT, () => console.log(`Listening on port ${APP_PORT}.`))