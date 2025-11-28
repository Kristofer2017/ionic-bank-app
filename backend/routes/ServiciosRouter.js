import { Router } from 'express';
import controller from '../controller/ServiciosController.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.get('/servicios/get/:id', verifyToken, (req, res) => {
    const { id } = req.params;

    controller.obtenerPorIdEmpresa(id).then((result) => {
        return res.json(result);
    }).catch((error) => {
        return res.status(500).send(`Excepción: ${error}`);
    });
});

export default router;