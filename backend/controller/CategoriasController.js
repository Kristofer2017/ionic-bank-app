import pool  from '../database/MySQLConexion.js';
import query from '../queries/CategoriasQuery.js';
 
export default {
    async insertar(dato) {
        const { sql, params } = query.insertar(dato);
        const [ result ] = await pool.execute(sql, params);
         
        return result.insertId;
    }, 
 
    async obtenerTodos() {
        const sql = query.obtenerTodos();
        const [ result ] = await pool.query(sql);
         
        return result;
    }, 
 
    async eliminarById(id) {
        const sql = query.eliminarById(id);
        const [ result ] = await pool.execute(sql);
         
        return result.affectedRows;
    }
}