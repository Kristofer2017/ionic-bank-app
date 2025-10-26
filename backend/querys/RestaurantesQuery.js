module.exports = { 
    insertar(restaurante) { 
        var sql = `INSERT INTO restaurantes (fecha_creacion, activo, nombre, descripcion, imagen_url, idcategoria) VALUES (now(), '${restaurante.activo}', '${restaurante.nombre}', '${restaurante.descripcion}', '${restaurante.imagen_url}', '${restaurante.idcategoria}')`; 
        return sql; 
    } 
} 