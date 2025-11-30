export default {
    insertar(notificacion) {
        const sql = 'INSERT INTO Notificacion (titulo, descripcion, id_usuario) VALUES (?,?,?)';
        const params = [notificacion.titulo, notificacion.descripcion, notificacion.id_usuario];
        return { sql, params };
    },
    actualizarVistoUna(idNoti, estado) {
        const sql = 'UPDATE Notificacion SET visto = ? WHERE id = ?';
        const params = [estado, idNoti];
        return { sql, params };
    },
    actualizarVistoTodos(idUsuario, estado) {
        const sql = 'UPDATE Notificacion SET visto = ? WHERE id_usuario = ?';
        const params = [estado, idUsuario];
        return { sql, params };
    },
    obtenerNotificaciones(idUsuario) {
        return `SELECT * from Notificacion WHERE id_usuario = ${idUsuario} ORDER BY id DESC`;
    }
}