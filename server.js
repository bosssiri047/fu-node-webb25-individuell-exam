import dns from 'dns';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import crypto from 'crypto';
import menuRouter from './routes/menu.route.js';
import ordersRouter from './routes/order.route.js';
import keysRouter from './routes/keys.route.js';
import authRouter from './routes/auth.route.js';
import productsRouter from './routes/products.route.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import cartsRouter from './routes/carts.route.js';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
dns.setServers(['1.1.1.1']);

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
app.use('/api/keys', keysRouter);
app.use('/api/menu', menuRouter);
app.use('/api/auth', authRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/carts', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Database
database.on('error', (error) => console.log(error));
database.once('connected', () => {
	console.log('Database connected');
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
});

// Error handler
app.use(errorHandler);
