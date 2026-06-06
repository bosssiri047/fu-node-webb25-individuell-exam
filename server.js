import express from 'express';
import dotenv from 'dotenv';
import menuRouter from './routes/menu.route.js';
import keysRouter from './routes/keys.route.js'
import authRouter from './routes/auth.route.js';
import cartRouter from './routes/cart.route.js';
import orderRouter from './routes/orders.route.js';
import mongoose from 'mongoose';
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import { setServers } from 'node:dns/promises';

setServers(['1.1.1.1', '8.8.8.8']);

// Config
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8081;
mongoose.connect(process.env.CONNECTION_STRING);
const database = mongoose.connection;
const swaggerDocs = YAML.load('./docs/docs.yml');

// Middlewares
app.use(express.json());

// Routes
app.use('/api/menu', menuRouter);
app.use('/api/carts', cartRouter);
app.use('/api/orders', orderRouter);
app.use('/api/keys', keysRouter);
app.use('/api/auth', authRouter);
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Server

database.on('error', (error) => console.log(error));
database.once('connected', () => {
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

app.use(errorHandler);
