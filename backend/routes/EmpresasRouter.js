import { Router } from 'express';
import controller from '../controller/EmpresasController.js';

const router = Router();

router.get('/empresas/get/all', (req, res) => {
    controller.obtenerTodos().then((result) => {
        return res.json(result);
    }).catch((e) => {
        return res.status(500).send(`Excepción: ${e.message}`);
    });
});

export default router;