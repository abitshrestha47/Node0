import express from 'express';
import 'dotenv/config.js';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoute.js';
import productRoutes from './routes/productRoute.js';

const PORT=process.env.PORT;
const app=express();

connectDB();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/',authRoutes);
app.use('/',categoryRoutes);
app.use('/',productRoutes);
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Server listening on http://localhost:${PORT}`);
});