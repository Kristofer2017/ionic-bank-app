const { pool } = require("../database/MySQLConexion") 
const departamentosQuery = require("../querys/DepartamentosQuery") 
 
module.exports = { 
    async insertar(departamento) { 
        const [ result ] = await pool.execute(departamentosQuery.insertar(departamento)); 
         
        return result.insertId; 
    }, 
 
    async obtenerTodos() { 
        const [ result ] = await pool.query(departamentosQuery.obtenerTodos()); 
         
        return result; 
    }, 
 
    async eliminarById(idDepartamento) { 
        const [ 
            result 
        ] = await pool.execute( 
            departamentosQuery.eliminarById( 
                idDepartamento 
            ) 
        ); 
         
        return result.affectedRows; 
    } 
} 
