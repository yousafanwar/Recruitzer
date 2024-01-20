import express from 'express';
import config from './config.js';
import userRoutes from './routes/user.js';
import indexRoutes from './routes/index.js';

let app = express();
app.use(express.json());
app.use('/api/', indexRoutes);
app.use('/api/user/', userRoutes);

app.listen(config.appPort, function () {
	console.log('Server listining on port 3000');
});
