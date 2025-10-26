const { pool } = require("../database/MySQLConexion") 
const categoriasQuery = require("../querys/CategoriasQuery") 
 
module.exports = { 
    async insertar(categoria) { 
        const [ 
            result 
        ] = await pool.execute( 
            categoriasQuery.insertar( 
                categoria 
            ) 
        ); 
         
        return result.insertId; 
    }, 
 
    async obtenerTodos() { 
        const [ 
            result 
        ] = await pool.query( 
            categoriasQuery.obtenerTodos() 
        ); 
         
        return result; 
    }, 
 
    async eliminarById(idCategoria) { 
        const [ 
            result 
        ] = await pool.execute( 
            categoriasQuery.eliminarById( 
                idCategoria 
            ) 
        ); 
return result.affectedRows; 
} 
} 