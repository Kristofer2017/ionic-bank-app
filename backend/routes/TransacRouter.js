import { Router } from "express";
import controller from '../controller/TransacController.js';
//import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.post('/transaction/add', (req, res) => {
    const transaction = req.body;

    controller.insertar(transaction).then((result) => {
        return res.json(result);
    }).catch((e) => {
        console.log(e.message);
        
        return res.status(500).send({ message: e.message });
    });
});

router.get('/transaction/get/:id', (req, res) => {
    const id = req.params.id;

    controller.obtenerTransacciones(id).then((result) => {
        return res.json(result);
    }).catch((e) => {
        return res.status(500).send({ message: e.message });
    });
});


export default router;