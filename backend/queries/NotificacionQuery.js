export default {
    insertar(notificacion) {
        const sql = 'INSERT INTO Notificacion (titulo, descripcion, id_usuario) VALUES (?,?,?)';
        const params = [notificacion.titulo, notificacion.descripcion, notificacion.id_usuario];
        return { sql, params };
    },
    obtenerNotificaciones(idUsuario) {
        return `SELECT * from Notificacion WHERE id_usuario = ${idUsuario}`;
    }
}