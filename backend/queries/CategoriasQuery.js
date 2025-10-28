export default {
    insertar(categoria) {
        const sql = `INSERT INTO Categoria (nombre_categoria) VALUES(?)`;
        const params = [categoria.nombre_categoria];

        return { sql, params };
    },
 
    obtenerTodos() {
        const sql = `SELECT * FROM Categoria ORDER BY nombre_categoria ASC`;

        return sql;
    },
 
    eliminarById(idCategoria) {
        const sql = `DELETE FROM Categoria WHERE id_categoria = ${idCategoria}`;

        return sql;
    }
}