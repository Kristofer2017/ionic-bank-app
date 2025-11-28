export default {
    insertar(tran) {
        const sql = 'INSERT INTO Transaccion (tipo, detalle, monto, metodo_pago, emisor, receptor, saldo_anterior, nuevo_saldo, estado, id_cuenta) VALUES (?,?,?,?,?,?,?,?,?,?)';
        const params = [tran.tipo, tran.detalle, tran.monto, tran.metodo_pago, tran.emisor, tran.receptor, tran.saldo_anterior, tran.nuevo_saldo, tran.estado, tran.id_cuenta];
        return { sql, params };
    },
    obtenerTransacciones(idCuenta) {
        return `SELECT * from Transaccion WHERE id_cuenta = ${idCuenta}`;
    }
}