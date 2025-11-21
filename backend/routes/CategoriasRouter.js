import { Router } from 'express';
import controller from '../controller/CategoriasController.js';

const router = Router();

router.get('/categorias/get/all', (req, res) => {
    controller.obtenerTodos().then((result) => {
        return res.json(result);
    }).catch((error) => {
        return res.status(500).send(`Excepción: ${error}`);
    });
});

export default router;