export default {
    insertar(usuario) {
        const sql = `INSERT INTO Usuario (nombre, telefono, email, dui, user, password) VALUES (?,?,?,?,?,?)`;
        const params = [usuario.nombre, usuario.telefono, usuario.email, usuario.dui, usuario.user, usuario.password];
        return { sql, params };
    },
    insertarCuenta(cuenta) {
        const sql = `INSERT INTO Cuenta (numero, tipo, id_usuario) VALUES (?,?,?)`;
        const params = [cuenta.numero, cuenta.tipo, cuenta.id_usuario];

        return { sql, params };
    },
    obtenerByUsuario(usuario) {
        return `SELECT * FROM Usuario WHERE user = '${usuario}'`;
    },
    obtenerCuenta(idUsuario) {
        return `SELECT id, numero, balance, tipo FROM Cuenta WHERE id_usuario = '${idUsuario}'`;
    }
}