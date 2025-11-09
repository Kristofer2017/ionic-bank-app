import express from 'express';
import cors from 'cors';
import categorias from './routes/CategoriasRouter.js';
import empresas from './routes/EmpresasRouter.js';
import servicios from './routes/ServiciosRouter.js';
//import methods from './routes/StripeRouter.js';
import usuarios from './routes/UsuariosRouter.js';

const port = 3000;
const ip = 'localhost';
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(categorias);
app.use(empresas);
app.use(servicios);
app.use(usuarios);
//app.use(methods);

app.listen(port, ip, () => {
    console.log(`Server running at http://${ip}:${port}`);
}) 