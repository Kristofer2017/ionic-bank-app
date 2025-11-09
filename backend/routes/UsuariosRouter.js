import { Router } from "express";
import controller from '../controller/UsuariosController.js';

const router = Router();

router.get('/usuario/register', (req, res) => {
    controller.obtenerUsuario().then((result) => {
        return res.json(result);
    }).catch((e) => {
        return res.status(500).send(`Excepción: ${e.message}`);
    });
});

router.get('/usuario/login', (req, res) => {
    controller.obtenerUsuario().then((result) => {
        return res.json(result);
    }).catch((e) => {
        return res.status(500).send(`Excepción: ${e.message}`);
    });
});

export default router;