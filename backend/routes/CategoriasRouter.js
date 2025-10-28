import { Router } from 'express';
import controller from '../controller/CategoriasController.js';

const router = Router();

router.post('/categorias/add', (req, res) => {
    const categoria = req.body;

    controller.insertar(categoria).then((result) => {
        return res.json(result);
    }).catch((error) => {
        return res.status(500).send(`Excepción: ${error}`);
    });
});

router.get('/categorias/get/all', (req, res) => {
    controller.obtenerTodos().then((result) => {
        return res.json(result);
    }).catch((error) => {
        return res.status(500).send(`Excepción: ${error}`);
    });
});

router.get('/categorias/delete/:id', (req, res) => {
    const { id } = req.params;

    controller.eliminarById(id).then((result) => {
        return res.json(result);
    }).catch((error) => {
        return res.status(500).send(`Excepción: ${error}`);
    });
});

export default router;