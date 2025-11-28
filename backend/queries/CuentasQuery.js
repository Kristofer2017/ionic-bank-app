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
}