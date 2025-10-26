const { Router } = require("express"); 
const pasatiemposController = 
require("../controller/PasatiemposController"); 
const router = Router(); 
 
router.post('/pasatiempos/add', (req, res) => { 
 
    const pasatiempo = req.body; 
 
    pasatiemposController.insertar(pasatiempo).then((result) => { 
         
        return res.json(result); 
 
    }).catch((err) => { 
        console.log(err); 
        return res.status(500).send('excepcion generada'); 
    }); 
}); 
 
router.get('/pasatiempos/get/all', (req, res) => { 
 
    pasatiemposController.obtenerTodos().then((result) => { 
         
        return res.json(result); 
 
    }).catch((err) => { 
        console.log(err); 
        return res.status(500).send('excepcion generada'); 
    }); 
}); 
 
router.get('/pasatiempos/delete/:id', (req, res) => { 
 
    const { id } = req.params; 
 
    pasatiemposController.eliminarById(id).then((result) => { 
         
        return res.json(result); 
 
    }).catch((err) => { 
        console.log(err); 
        return res.status(500).send('excepcion generada'); 
    }); 
}); 
 
module.exports = router; 