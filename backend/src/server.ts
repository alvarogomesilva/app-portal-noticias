import express, { json } from 'express';
import Routes from './routes/routes';
import cors from 'cors'

const app = express()

app.use(cors()) 
app.use(json())

app.use(Routes)

app.listen(3000, () => console.log('Server is listening!'))