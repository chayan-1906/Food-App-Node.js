import express from 'express';
import 'colors';
import cors from 'cors';
import morgan from 'morgan';
import {PORT} from "./config/config";
import {connectDB} from "./config/db";
import testRoutes from './routes/TestRoutes';
import authRoutes from "./routes/AuthRoutes";
import userRoutes from "./routes/UserRoutes";
import restaurantRoutes from "./routes/RestaurantRoutes";
import categoryRoutes from "./routes/CategoryRoutes";
import foodRoutes from "./routes/FoodRoutes";
import orderRoutes from "./routes/OrderRoutes";

// rest object
const app = express();

// db connection
connectDB();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

/*app.get('/', (req: Request, res: Response): Response => {
    return res.status(200).send('<h1>Welcome to Food App Server</h1>');
});*/

// app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/restaurant', restaurantRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/food', foodRoutes);
app.use('/api/v1/order', orderRoutes);

app.get('/', function (req, res) {
    res.status(200).send('<h1>Welcome to Food App Server</h1>');
});

const port = PORT || 3000;

app.listen(port, () => {
    console.log(`Server Running on ${port}`.bgMagenta.white.italic);
});
