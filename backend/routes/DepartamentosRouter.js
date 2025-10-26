const { Router } = require("express"); 
const departamentosController = require("../controller/DepartamentosController"); 
const router = Router(); 
 
router.post('/departamentos/add', (req, res) => { 
    const departamento = req.body; 
 
    departamentosController.insertar(departamento).then((result) => { 
        return res.json(result); 
    }).catch((err) => { 
        console.log(err); 
        return res.status(500).send('excepcion generada'); 
    }); 
}); 
 
router.get('/departamentos/get/all', (req, res) => { 
    departamentosController.obtenerTodos().then((result) => { 
        return res.json(result);
    }).catch((err) => { 
        console.log(err); 
        return res.status(500).send('excepcion generada'); 
    }); 
}); 
 
router.get('/departamentos/delete/:id', (req, res) => { 
    const { id } = req.params; 
 
    departamentosController.eliminarById(id).then((result) => { 
        return res.json(result);
    }).catch((err) => { 
        console.log(err); 
        return res.status(500).send('excepcion generada'); 
    }); 
}); 
 
module.exports = router; 