import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.route.js';
import productRoutes from './routes/product.routes.js';
const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/product", productRoutes);

export default app;