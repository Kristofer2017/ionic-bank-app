import { Router } from "express";
import controller from '../controller/NotificacionController.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.post('/notificacion/add', verifyToken, (req, res) => {
    const notificacion = req.body;

    controller.insertar(notificacion).then((result) => {
        return res.json(result);
    }).catch((e) => {
        return res.status(500).send({ message: e.message });
    });
});

router.get('/notificacion/get/:id', verifyToken, (req, res) => {
    const id = req.params.id;

    controller.obtenerNotificaciones(id).then((result) => {
        return res.json(result);
    }).catch((e) => {
        return res.status(500).send({ message: e.message });
    });
});

router.patch('/notificacion/actualizar-una', verifyToken, (req, res) => {
    const { id_notificacion, visto } = req.body;

    controller.actualizarUna(id_notificacion, visto).then((result) => {
        return res.json(result);
    }).catch((e) => {
        return res.status(500).send({ message: e.message });
    });
});

router.patch('/notificacion/actualizar-todas', verifyToken, (req, res) => {
    const { id_usuario, visto } = req.body;

    controller.actualizarTodas(id_usuario, visto).then((result) => {
        return res.json(result);
    }).catch((e) => {
        return res.status(500).send({ message: e.message });
    });
});


export default router;