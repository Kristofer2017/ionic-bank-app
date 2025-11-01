export default {
    obtenerPorIdEmpresa(idEmpresa) {
        const sql = `SELECT * FROM Servicio WHERE id_empresa = ${idEmpresa}`;

        return sql;
    }
}