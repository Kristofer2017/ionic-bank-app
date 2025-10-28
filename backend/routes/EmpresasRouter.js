import { Router } from 'express';
import controller from '../controller/EmpresasController.js';

const router = Router();

router.post('/empresas/add', (req, res) => {
    const empresa = req.body;

    controller.insertar(empresa).then((result) => {
        return res.json(result);
    }).catch((error) => {
        return res.status(500).send(`Excepción: ${error}`);
    });
});

router.get('/empresas/get/all', (req, res) => {
    controller.obtenerTodos().then((result) => {
        return res.json(result);
    }).catch((error) => {
        return res.status(500).send(`Excepción: ${error}`);
    });
});

router.get('/empresas/delete/:id', (req, res) => {
    const { id } = req.params;

    controller.eliminarById(id).then((result) => {
        return res.json(result);
    }).catch((error) => {
        return res.status(500).send(`Excepción: ${error}`);
    });
});

export default router;