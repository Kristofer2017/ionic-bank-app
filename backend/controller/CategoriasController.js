import pool  from '../database/MySQLConexion.js';
import query from '../queries/CategoriasQuery.js';
 
export default {
    async obtenerTodos() {
        const sql = query.obtenerTodos();
        const [ result ] = await pool.query(sql);
         
        return result;
    }
}