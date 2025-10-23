const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;
const ip = 'localhost';
const defaultUser = { username: "kristofer.vasquez", password: "005524" };
var motos = [{
    marca: "Honda",
    modelo: "CB190R",
    anio: 2024,
    imagenURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUH8s7zzWjmpIAq-3FiuHTCjjOEF7UD6gyoQ&s",
    precio: 3200
}];

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username == defaultUser.username && password == defaultUser.password) {
        return res.json({ username, password });
    } else {
        return res.status(404).json({ message: "datos no encontrados" });
    }
});

app.post('/get/user', (req, res) => {
    try {
        return res.json(defaultUser.username);
    } catch (error) {
        return res.status(500).json("message: error en el servidor")
    }
});

app.post('/add/moto', (req, res) => {
    try {
        const { marca, modelo, anio, imagenURL, precio } = req.body

        motos.push({ marca, modelo, anio, imagenURL, precio })

        return res.json({ marca, modelo, anio, imagenURL, precio });
    } catch (error) {
        return res.status(500).json("message: error en el servidor")
    }
})

app.get('/get/motos', (req, res) => {
    try {
        return res.json(motos);
    } catch (error) {
        return res.status(500).json("message: error en el servidor")
    }
})

app.delete('/delete/moto/:modelo', (req, res) => {
    try {
        const { modelo } = req.params;
        const index = motos.findIndex(m => m.modelo == modelo);

        if (index === -1) {
            return res.status(404).json({ message: "Moto no encontrada" });
        }

        motos.splice(index, 1); // elimina la moto del arreglo

        return res.json({ message: "Moto eliminada correctamente" });
    } catch (error) {
        return res.status(500).json("message: error en el servidor")
    }
})

app.listen(port, ip, () => {
    console.log(`Server listening at: ${port}`);
});