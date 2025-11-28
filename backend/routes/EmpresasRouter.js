import { Router } from 'express';
import controller from '../controller/EmpresasController.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.get('/empresas/get/all', verifyToken, (req, res) => {
    controller.obtenerTodos().then((result) => {
        return res.json(result);
    }).catch((e) => {
        return res.status(500).send(`Excepción: ${e.message}`);
    });
});

export default router;