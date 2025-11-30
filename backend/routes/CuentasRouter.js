import { Router } from "express";
import { verifyToken } from '../middleware/auth.js';
import controller from '../controller/CuentasController.js';

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

router.post('/cuenta/transferir', verifyToken, (req, res) => {
    const data = req.body;

    controller.transferir(data).then((result) => {
        return res.json(result);
    }).catch((e) => {
        console.log(e);
        
        return res.status(500).send({ message: e.message });
    });
});

router.post('/cuenta/buscar', verifyToken, (req, res) => {
    const { numero_cuenta } = req.body;

    controller.buscarCuenta(numero_cuenta).then((result) => {
        return res.json(result);
    }).catch((e) => {
        return res.status(404).send({ message: e.message });
    });
});

export default router;