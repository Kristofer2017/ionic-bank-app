import { Router } from "express";
import controller from '../controller/UsuariosController.js';
import { verifyToken } from '../middleware/auth.js';

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

router.get('/usuario/check', verifyToken, (req, res) => {
    res.status(200).json({ logged: true });
});

router.get('/usuario/me', verifyToken, (req, res) => {
    const user = req.user;

    controller.obtenerCuenta(user.id).then((result) => {
        res.json({ ...user, cuenta: result });
    }).catch((e) => {
        return res.status(500).send({ message: e.message });
    });
});

router.post('/usuario/logout', (req, res) => {
    res.clearCookie('access_token', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict'
    });

    res.send({ message: 'Sesión cerrada' });
});

export default router;