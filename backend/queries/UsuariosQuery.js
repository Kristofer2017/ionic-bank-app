export default {
    insertar(usuario) {
        const sql = `INSERT INTO Usuario (nombre, telefono, email, dui, user, password) VALUES (?,?,?,?,?,?)`;
        const params = [usuario.nombre, usuario.telefono, usuario.email, usuario.dui, usuario.user, usuario.password];
        return { sql, params };
    },

    insertarCuenta(cuenta) {
        const sql = `INSERT INTO Cuenta (cuenta, tipo, id_usuario) VALUES (?,?,?)`;
        const params = [cuenta.cuenta, cuenta.tipo, cuenta.id_usuario];

        return { sql, params };
    },

    obtenerByUsuario(usuario) {
        const sql = `SELECT * FROM Usuario WHERE user = '${usuario}'`;
        return sql;
    },
}