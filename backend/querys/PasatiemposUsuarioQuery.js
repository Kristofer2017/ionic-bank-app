module.exports = { 
    insertar(pasatiempoUsuario) { 
        var sql = `INSERT INTO pasatiempos_usuario (activo, idusuario, idpasatiempo) VALUES ('${pasatiempoUsuario.activo}', '${pasatiempoUsuario.idusuario}', '${pasatiempoUsuario.idpasatiempo}')`;
        return sql; 
    } 
} 