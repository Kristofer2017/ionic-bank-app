export default {
    obtenerTodos() {
        return `SELECT e.id AS empresa_id, e.nombre AS nombre_empresa, e.estado, c.id AS categoria_id, c.nombre AS nombre_categoria 
            FROM Empresa e LEFT JOIN Categoria c ON e.id_categoria = c.id`;
    }
}