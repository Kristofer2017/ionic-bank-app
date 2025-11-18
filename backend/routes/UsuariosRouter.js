import { Router } from "express";
import controller from '../controller/UsuariosController.js';

const router = Router();

router.post('/usuario/register', (req, res) => {
    const usuario = req.body;

    controller.insertarUsuario(usuario).then((result) => {
        return res.json(result);
    }).catch((e) => {
        return res.status(500).send({ message: e.message });
    });
});

router.post('/usuario/login', (req, res) => {
    const { user, password } = req.body;

    controller.login(user, password).then(resp => {       
        res.cookie('access_token', resp.token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 60 * 60 * 1000
        }).send({ message: "Login correcto" })
        
    }).catch((e) => {
        return res.status(401).send({ message: e.message });
    });
});

export default router;