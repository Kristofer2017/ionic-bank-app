export default {
    insertar({ tipo, titulo, detalle, monto, metodo_pago, emisor, receptor, saldo_anterior, nuevo_saldo, id_cuenta }) {
        const sql = `INSERT INTO Transaccion (tipo, titulo, detalle, monto, metodo_pago, emisor, receptor, saldo_anterior, nuevo_saldo, id_cuenta) VALUES (?,?,?,?,?,?,?,?,?,?)`;
        const params = [tipo, titulo, detalle, monto, metodo_pago, emisor, receptor, saldo_anterior, nuevo_saldo, id_cuenta];
        
        return { sql, params };
    },
    obtenerTransacciones(idCuenta) {
        return `SELECT * from Transaccion WHERE id_cuenta = ${idCuenta} ORDER BY id DESC`;
    }
}