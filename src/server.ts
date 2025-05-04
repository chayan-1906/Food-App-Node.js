import express from 'express';
import 'colors';
import cors from 'cors';
import morgan from 'morgan';
import {PORT} from "./config/config.ts";
import testRoutes from './routes/testRoutes.ts';

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

/*app.get('/', (req: Request, res: Response): Response => {
    return res.status(200).send('<h1>Welcome to Food App Server</h1>');
});*/

app.use('/api/v1/test', testRoutes);

app.get('/', function (req, res) {
    res.status(200).send('<h1>Welcome to Food App Server</h1>');
});

const port = PORT || 3000;

app.listen(port, () => {
    console.log(`Server Running on ${port}`.bgMagenta.white.italic);
});
