export default {
    obtenerPorIdEmpresa(idEmpresa) {
        return `SELECT * FROM Servicio WHERE id_empresa = ${idEmpresa}`;
    }
}