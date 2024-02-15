import express from 'express';
import config from './config.js';
import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';
import cors from 'cors';

let app = express();
app.use(express.json());

app.use(cors());

app.use('/api/', authRoutes);

app.use('/api/user/', userRoutes);

app.listen(config.appPort, function () {
	console.log('Server listining on port 3000');
});
