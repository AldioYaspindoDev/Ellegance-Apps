import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.route.js';
import productRoutes from './routes/product.routes.js';
import bucketRoutes from './routes/bucket.route.js';
import OrderRoute from './routes/order.route.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('public/uploads'));

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/bucket", bucketRoutes);
app.use("/order", OrderRoute);

export default app;