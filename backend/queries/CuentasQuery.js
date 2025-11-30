export default {
    recargar(id_cuenta, monto) {
        const sql = `UPDATE Cuenta SET balance = balance + ? WHERE id = ?`;
        const params = [monto, id_cuenta];

        return { sql, params };
    },
    debitar(id_cuenta, monto) {
        const sql = `UPDATE Cuenta SET balance = balance - ? WHERE id = ?`;
        const params = [monto, id_cuenta];

        return { sql, params };
    },
    obtenerCuenta(numeroCuenta) {
        return `SELECT * FROM Cuenta WHERE numero = '${numeroCuenta}'`;
    },
    obtenerUsuario(idUsuario) {
        return `SELECT id, nombre, telefono, email, dui, user FROM Usuario WHERE id = ${idUsuario}`;
    }
}