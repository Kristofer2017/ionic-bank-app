import pool  from '../database/MySQLConexion.js';
import queries from '../queries/EmpresasQuery.js';
 
export default {
    async insertar(dato) {
        const { sql, params } = queries.insertar(dato);
        const [ result ] = await pool.execute(sql, params);
         
        return result.insertId;
    }, 
 
    async obtenerTodos() {
        const sql = queries.obtenerTodos();
        const [ result ] = await pool.query(sql);
         
        return result;
    }, 
 
    async eliminarById(id) {
        const sql = queries.eliminarById(id);
        const [ result ] = await pool.execute(sql);
         
        return result.affectedRows;
    }
}