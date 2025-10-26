module.exports = {
    insertar(empresa) {
        var sql = `INSERT INTO Empresa (nombre_empresa, id_categoria, estado) VALUES ('{empresa.nombre}', {empresa.categoria}, '{empresa.estado}')`;
        return sql;
    },

    obtenerTodos() {
        var sql = `SELECT * FROM Empresa WHERE activo = 'Y' ORDER BY nombre ASC`;
        return sql;
    },
}