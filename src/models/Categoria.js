import connection from "../utils/db.js";

class Categoria {
    constructor() {}

    async getAll() {
        try {
            const [rows] = await connection.query("select * from categorias");
            return {
                error: false,
                codigo: 200,
                mensaje: "Categorías obtenidas exitosamente",
                data: rows
            };
        } catch (error) {
            return {
                error: true,
                codigo: 500,
                mensaje: "¡Error al obtener las categorías!",
                data: []
            };
        }
    }

    async create(nombre, descripcion) {
        try {
            const [result] = await connection.query("insert into categorias (nombre, descripcion) values (?, ?)", [nombre, descripcion]);
            return {
                error: false,
                codigo: 201,
                mensaje: "Categoría creada exitosamente",
                data: [{ id: result.insertId, nombre, descripcion }]
            };
        } catch (error) {
            return {
                error: true,
                codigo: 500,
                mensaje: "Error al crear la categoría",
                data: []
            };
        }
    }

    async getBydId(id) {
        try {
            const [rows] = await connection.query("select * from categorias where id = ?", [id]);
            if (rows.length === 0) {
                return {
                    error: true,
                    codigo: 404,
                    mensaje: "Categoría no encontrada",
                    data: []
                };
            }
            return {
                error: false,
                codigo: 200,
                mensaje: "Categoría obtenida exitosamente",
                data: rows[0]
            };
        } catch (error) {
            return {
                error: true,
                codigo: 500,
                mensaje: "Error al obtener la categoría",
                data: []
            };
        }
    }

    async estaRelacionadaConProductos(categoria_id) {
        try {
            const [rows] = await connection.query("select * from productos where categoria_id = ?", [categoria_id]);
            return {
                error: false,
                codigo: 200,
                mensaje: "Productos obtenidos exitosamente",
                data: rows
            };
        } catch (error) {
            return {
                error: true,
                codigo: 500,
                mensaje: "Error al obtener productos relacionados",
                data: []
            };
        }
    }

    async update(id, nombre) {
        try {
            const [result] = await connection.query("update categorias set nombre = ? where id = ?", [nombre, id]);
            if (result.affectedRows === 0) {
                return {
                    error: true,
                    codigo: 400,
                    mensaje: "La categoría no fue actualizada",
                    data: []
                };
            }
            return {
                error: false,
                codigo: 200,
                mensaje: "La categoría fue actualizada",
                data: []
            };
        } catch (error) {
            return {
                error: true,
                codigo: 500,
                mensaje: "Error al actualizar la categoría",
                data: []
            };
        }
    }

    async delete(id) {
        try {
            let datos = await this.getBydId(id);
            const tieneProductos = await this.estaRelacionadaConProductos(datos.data.id);
            if (tieneProductos.data.length > 0) {
                return {
                    error: true,
                    codigo: 400,
                    mensaje: "No puede eliminar la categoría porque está relacionada con productos",
                    data: []
                };
            }

            const [result] = await connection.query("delete from categorias where id = ?", [id]);
            if (result.affectedRows === 0) {
                return {
                    error: true,
                    codigo: 404,
                    mensaje: "Categoría no encontrada",
                    data: []
                };
            }

            return {
                error: false,
                codigo: 200,
                mensaje: "Categoría eliminada exitosamente",
                data: datos.data
            };
        } catch (error) {
            return {
                error: true,
                codigo: 500,
                mensaje: "Error al eliminar la categoría",
                data: []
            };
        }
    }

    async updatePartial(id, campos) {
        let query = "UPDATE categorias SET ";
        let params = [];
        for (const [key, value] of Object.entries(campos)) {
            query += `${key} = ?, `;
            params.push(value);
        }
        query = query.slice(0, -2);
        query += " where id = ?";
        params.push(id);

        try {
            const [result] = await connection.query(query, params);
            if (result.affectedRows === 0) {
                return {
                    error: true,
                    codigo: 400,
                    mensaje: "No puede actualizar la categoría",
                    data: []
                };
            }
            return {
                error: false,
                codigo: 200,
                mensaje: "La categoría fue actualizada parcialmente",
                data: []
            };
        } catch (error) {
            return {
                error: true,
                codigo: 500,
                mensaje: error.message,
                data: []
            };
        }
    }
}

export default Categoria;