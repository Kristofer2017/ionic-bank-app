const { pool } = require("../database/MySQLConexion") 
const pasatiemposUsuarioQuery = 
require("../querys/PasatiemposUsuarioQuery") 
 
module.exports = { 
    async insertar(pasatiempoUsuario) { 
        const [ 
            result 
        ] = await pool.execute( 
            pasatiemposUsuarioQuery.insertar( 
                pasatiempoUsuario 
            ) 
        ); 
         
        return result.insertId; 
    } 
}