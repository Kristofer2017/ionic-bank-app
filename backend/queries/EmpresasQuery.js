export default {
    insertar(empresa) {
        const sql = `INSERT INTO Empresa (nombre_empresa, id_categoria, estado) VALUES (?, ?, ?)`;
        const params = [empresa.nombre_empresa, empresa.id_categoria, empresa.estado];

        return { sql, params };
    },
 
    obtenerTodos() {
        const sql = `SELECT Empresa.*, Categoria.nombre_categoria FROM Empresa, Categoria WHERE Empresa.id_categoria = Categoria.id_categoria ORDER BY nombre_empresa ASC`;

        return sql;
    },
 
    eliminarById(idEmpresa) {
        const sql = `DELETE FROM Empresa WHERE id_empresa = ${idEmpresa}`;

        return sql;
    }
}