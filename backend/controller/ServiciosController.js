import pool  from '../database/MySQLConexion.js';
import query from '../queries/ServiciosQuery.js';

export default {
    async obtenerPorIdEmpresa(idEmpresa) {
        const sql = query.obtenerPorIdEmpresa(idEmpresa);
        const [ result ] = await pool.query(sql);

        return result;
    }
}