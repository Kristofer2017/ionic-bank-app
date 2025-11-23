export default {
    insertar(metodo) {
        const sql = 'INSERT INTO Metodo (titular, ultimos4, marca, expiracion, id_usuario) VALUES (?,?,?,?,?)';
        const params = [metodo.titular, metodo.ultimos4, metodo.marca, metodo.expiracion, metodo.id_usuario ];
        return { sql, params };
    },
    obtenerMetodosUsuario(idUsuario) {
        return `SELECT id, titular, ultimos4, marca, expiracion FROM Metodo WHERE id_usuario = ${idUsuario}`;
    },
    eliminarMetodo(id) {
        return `DELETE FROM Metodo WHERE id = ${id}`;
    },
    actualizarMetodo(metodo){
        const sql = `UPDATE Metodo SET titular = ?, ultimos4 = ?, marca = ?, expiracion = ? WHERE id = ?`;
        const params = [metodo.titular, metodo.ultimos4, metodo.marca, metodo.expiracion, metodo.id];
        return { sql, params };
    }
}