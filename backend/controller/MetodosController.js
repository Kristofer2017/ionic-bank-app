import pool  from '../database/MySQLConexion.js';
import query from '../queries/MetodosQuery.js';

export default {
    async insertar(metodo) {
        const { sql, params } = query.insertar(metodo);
        const [ result ] = await pool.query(sql, params);
        return result.insertId;
    },
    async obtenerMetodosUsuario(idUsuario) {
        const sql = query.obtenerMetodosUsuario(idUsuario);
        const [ result ] = await pool.query(sql);
        return result;
    },
    async eliminarMetodo(id) {
        const sql = query.eliminarMetodo(id);
        const [ result ] = await pool.query(sql);

        if (result.affectedRows === 0) {
            throw new Error('No se encontró el registro');
        } else {
            return { message: 'Registro eliminado correctamente.' };
        }
    },
    async actualizarMetodo(metodo) {
        const { sql, params } = query.actualizarMetodo(metodo);
        const [ result ] = await pool.query(sql, params);

        if (result.affectedRows === 0) {
            throw new Error('No se encontró el registro');
        } else {
            return { message: 'Registro actualizado correctamente.' };
        }
    }
}