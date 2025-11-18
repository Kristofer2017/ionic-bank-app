import express from 'express';
import cors from 'cors';
import categorias from './routes/CategoriasRouter.js';
import empresas from './routes/EmpresasRouter.js';
import servicios from './routes/ServiciosRouter.js';
import usuarios from './routes/UsuariosRouter.js';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

const port = 3000;
const ip = 'localhost';
const app = express();

dotenv.config();
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:8100',
    credentials: true
}));
app.use(categorias);
app.use(empresas);
app.use(servicios);
app.use(usuarios);

app.listen(port, ip, () => {
    console.log(`Server running at http://${ip}:${port}`);
}) 