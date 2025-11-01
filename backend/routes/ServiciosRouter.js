import { Router } from 'express';
import controller from '../controller/ServiciosController.js';

const router = Router();

router.get('/servicios/get/:id', (req, res) => {
    const { id } = req.params;

    controller.obtenerPorIdEmpresa(id).then((result) => {
        return res.json(result);
    }).catch((error) => {
        return res.status(500).send(`Excepción: ${error}`);
    });
});

export default router;