import express from 'express';
import { todos } from './routes';

const app = express();

app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

app.use('/api/todos', todos.default);

app.listen(3000);