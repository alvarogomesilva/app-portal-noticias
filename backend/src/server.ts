import express, { json } from 'express';
import Routes from './routes/routes';


const app = express()

app.use(json())

app.use(Routes)

app.listen(3000, () => console.log('Server is listening!'))