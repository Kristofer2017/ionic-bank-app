export default {
    obtenerTodos() {
        return 'SELECT e.id AS empresa_id, e.empresa, e.estado, c.id AS categoria_id, c.categoria FROM Empresa e LEFT JOIN Categoria c ON e.id_categoria = c.id';
    }
}