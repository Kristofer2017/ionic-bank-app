import pool  from '../database/MySQLConexion.js';
import query from '../queries/EmpresasQuery.js';
 
export default {
    async obtenerTodos() {
        const sql = query.obtenerTodos();
        const [ result ] = await pool.query(sql);

        const empresas = result.map(r => ({
            id: r.empresa_id,
            nombre: r.nombre_empresa,
            estado: r.estado,
            categoria: {
                id: r.categoria_id,
                nombre: r.nombre_categoria
            }
        }));
         
        return empresas;
    },
}