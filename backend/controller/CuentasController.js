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
    }
}