import pool  from '../database/MySQLConexion.js';
import query from '../queries/NotificacionQuery.js';

export default {
    async insertar(notificacion) {
        const { sql, params } = query.insertar(notificacion);
        const [ result ] = await pool.query(sql, params);
        return result.insertId;
    },
    async actualizarUna(idNoti, estado) {
        const { sql, params } = query.actualizarVistoUna(idNoti, estado);
        const [ result ] = await pool.query(sql, params);
        return result.insertId;
    },
    async actualizarTodas(idUsuario, estado) {
        const { sql, params } = query.actualizarVistoTodos(idUsuario, estado);
        const [ result ] = await pool.query(sql, params);
        return result.insertId;
    },
    async obtenerNotificaciones(idUsuario) {
        const sql = query.obtenerNotificaciones(idUsuario);
        const [ result ] = await pool.query(sql);
        return result;
    }
}