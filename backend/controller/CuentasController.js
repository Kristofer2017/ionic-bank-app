import pool  from '../database/MySQLConexion.js';
import query from '../queries/CuentasQuery.js';

export default {
    async recargar(id_cuenta, monto) {
        const { sql, params } = query.recargar(id_cuenta, monto);
        await pool.execute(sql, params);

        return { message: 'Saldo recargado correctamente' };
    },
    async debitar(id_cuenta, monto) {
        const { sql, params } = query.debitar(id_cuenta, monto);
        await pool.execute(sql, params);

        return { message: 'Saldo debitado correctamente' };
    },
    async transferir(data) {
        const { id_cuenta_origen, id_cuenta_destino, monto } = data;

        const debit = query.debitar(id_cuenta_origen, monto);
        await pool.execute(debit.sql, debit.params);

        const credit = query.recargar(id_cuenta_destino, monto);
        await pool.execute(credit.sql, credit.params);
        
        return { message: 'Transferencia completada' };
    },
    async buscarCuenta(numeroCuenta) {
        let sql = query.obtenerCuenta(numeroCuenta);
        const [cuenta_array] = await pool.execute(sql);

        if (cuenta_array.length == 0) {
            throw new Error("No se encontro la cuenta");
        }

        sql = query.obtenerUsuario(cuenta_array[0].id_usuario);
        const [usuario_array] = await pool.execute(sql);

        if (usuario_array.length == 0) {
            throw new Error("No se encontro el usuario");
        }

        delete cuenta_array[0].id_usuario;

        return { ...usuario_array[0], cuenta: cuenta_array[0] }
    }
}