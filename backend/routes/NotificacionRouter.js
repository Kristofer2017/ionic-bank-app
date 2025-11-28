import { Router } from "express";
import controller from '../controller/NotificacionController.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.post('/notificacion/add', verifyToken, (req, res) => {
    const notificacion = req.body;

    controller.insertar(notificacion).then((result) => {
        return res.json(result);
    }).catch((e) => {
        console.log(e.message);
        
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


export default router;