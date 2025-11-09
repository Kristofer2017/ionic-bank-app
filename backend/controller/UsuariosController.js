import pool from "../database/MySQLConexion.js";
import query from '../queries/UsuariosQuery.js';

export default {
    async obtenerUsuario() {
        const sql = query.obtenerUsuario();
        const [ result ] = await pool.execute(sql);

        return result;
    }
}