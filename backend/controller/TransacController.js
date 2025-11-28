import pool  from '../database/MySQLConexion.js';
import query from '../queries/TransacQuery.js';

export default {
    async insertar(transaccion) {
        const { sql, params } = query.insertar(transaccion);
        const [ result ] = await pool.query(sql, params);
        return result.insertId;
    },
    async obtenerTransacciones(idCuenta) {
        const sql = query.obtenerTransacciones(idCuenta);
        const [ result ] = await pool.query(sql);
        return result;
    }
}