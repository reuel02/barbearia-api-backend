import express from 'express';
import 'dotenv/config'
import UsuariosRouter from './routes/usuarios.routes.js';

const app = express();

app.use(express.json());

app.use(UsuariosRouter);

app.listen(process.env.PORT);