module.exports = { 
    insertar(usuario) { 
        var sql = `INSERT INTO usuarios (fecha_creacion, activo, nombre_completo, genero, usuario, password, iddepartamento) VALUES (now(), '${usuario.activo}', '${usuario.nombre_completo}', '${usuario.genero}', '${usuario.usuario}', '${usuario.password}', '${usuario.iddepartamento}')`; 
        return sql; 
    }, 
 
    obtenerByUsuarioByPassword(usuario, password) { 
        var sql = `SELECT * FROM usuarios WHERE usuario = '${usuario}' AND '${password}'`; 
        return sql; 
    } 
} 