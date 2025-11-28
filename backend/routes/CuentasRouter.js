import { Router } from "express";
import controller from '../controller/CuentasController.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.post('/cuenta/recargar', verifyToken, (req, res) => {
    const { id_cuenta, monto } = req.body;

    controller.recargar(id_cuenta, monto).then((result) => {
        return res.json(result);
    }).catch((e) => {
        return res.status(500).send({ message: e.message });
    });
});

router.post('/cuenta/debitar', verifyToken, (req, res) => {
    const { id_cuenta, monto } = req.body;

    controller.debitar(id_cuenta, monto).then((result) => {
        return res.json(result);
    }).catch((e) => {
        return res.status(500).send({ message: e.message });
    });
});

export default router;