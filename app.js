import express from 'express';
import categoriasRouter from './src/routes/categoriasRoutes.js';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true}))

app.use('/categorias', categoriasRouter)

app.listen(3000, () => {
    console.log("¡Hello world!");
})