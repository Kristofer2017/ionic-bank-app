import { Router } from "express";
import controller from '../controller/MetodosController.js';
//import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.post('/metodos/add', (req, res) => {
    const metodo = req.body;

    controller.insertar(metodo).then((result) => {
        return res.json(result);
    }).catch((e) => {
        return res.status(500).send({ message: e.message });
    });
});

router.get('/metodos/usuario/:id', (req, res) => {
    const id = req.params.id;

    controller.obtenerMetodosUsuario(id).then((result) => {
        return res.json(result);
    }).catch((e) => {
        return res.status(500).send({ message: e.message });
    });
});

router.delete('/metodos/eliminar/:id', (req, res) => {
    const id = req.params.id;

    controller.eliminarMetodo(id).then((result) => {
        return res.json(result);
    }).catch((e) => {
        return res.status(500).send({ message: e.message });
    });
});

router.put('/metodos/actualizar', (req, res) => {
    const metodo = req.body;

    controller.actualizarMetodo(metodo).then((result) => {
        return res.json(result);
    }).catch((e) => {
        return res.status(500).send({ message: e.message });
    });
})

export default router;