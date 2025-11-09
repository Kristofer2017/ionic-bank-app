export default {
    insertar(usuario) {
        const sql = `INSERT INTO Usuario (nombre_usuario, telefono, email, dui, stripe_customer_id, user, password) VALUES (?,?,?,?,?,?,?)`;
        const params = [];
        return { sql, params };
    },

    obtenerUsuario() {
        const sql = 'SELECT * FROM Usuario WHERE id_usuario = 1';
        return sql;
    }
}