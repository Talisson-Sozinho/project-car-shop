import express from 'express';
import errorMiddleware from './middlewares/error.middleware';
import routes from './Routes';

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorMiddleware);

export default app;
