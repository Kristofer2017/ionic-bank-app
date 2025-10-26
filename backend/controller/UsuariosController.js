const { pool } = require("../database/MySQLConexion") 
const usuariosQuery = require("../querys/UsuariosQuery") 
 
module.exports = { 
    async insertar(usuario) { 
        const [ 
            result 
        ] = await pool.execute( 
            usuariosQuery.insertar( 
                usuario 
            ) 
        ); 
         
        return result.insertId; 
    }, 
 
    async obtenerByUsuarioByPassword(usuario, password) { 
        const [ 
            result 
        ] = await pool.query( 
            usuariosQuery.obtenerByUsuarioByPassword( 
                usuario,  
                password 
            ) 
        ); 
         
        return result; 
    } 
}