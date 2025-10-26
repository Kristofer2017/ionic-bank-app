const { pool } = require("../database/MySQLConexion") 
const pasatiemposQuery = require("../querys/PasatiemposQuery") 
 
module.exports = { 
    async insertar(pasatiempo) { 
        const [ 
            result 
        ] = await pool.execute( 
            pasatiemposQuery.insertar( 
                pasatiempo 
            ) 
        ); 
         
        return result.insertId; 
    }, 
 
    async obtenerTodos() { 
        const [ 
            result 
        ] = await pool.query( 
            pasatiemposQuery.obtenerTodos() 
        ); 
         
        return result; 
    }, 
 
    async eliminarById(idPasatiempo) { 
        const [ 
            result 
        ] = await pool.execute( 
            pasatiemposQuery.eliminarById( 
                idPasatiempo 
            ) 
        ); 
         
        return result.affectedRows; 
    } 
}