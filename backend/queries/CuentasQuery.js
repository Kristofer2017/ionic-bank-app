export default {
    recargar(monto, id_cuenta) {
        const sql = `UPDATE Cuenta SET balance = balance + ? WHERE id = ?`;
        const params = [monto, id_cuenta];

        return { sql, params };
    }
}