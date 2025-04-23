import connection from "../utils/db.js";

class Categoria {
    constructor() {

    }
    async getAll() {
        try {
            const [rows] = await connection.query("select * from categorias");
            return rows;
        } catch (error) {
            throw new Error("¡Error al obtener las categorías!");
        }
    }
    // Método => crear una categoría
    async create(nombre, descripcion) {
        const [result] = await connection.query("insert into categorias (nombre, descripcion) values (?, ?)", [nombre, descripcion])
        return {
            id: result.insertId,
            nombre,
            descripcion
        }
    }
    // Método => eliminar por ID
    async getBydId(id) {
        try {
            const [rows] = await connection.query("select * from categorias where id = ?", [id]);

            if (rows.length === 0) {
                throw new Error("Categoria no encontrada");
            }
            return rows[0];
        } catch (error) {
            throw new Error("Error al obtener la categoria");
        }
    }

    async estaRelacionadaConProductos(categoria_id) {
        try {
            const [rows] = await connection.query("select * from productos where categoria_id = ?", [categoria_id]);
            return rows;
        } catch (error) {
            throw new Error("Error al obtener la categoria");
        }
    }

    async update(id, nombre) {
        try {
            const [result] = await connection.query("update productos set nombre = ? where id = ?", [nombre, id]);
            if (result.affectedRows === 0) {
                return {
                    error: true,
                    mensaje: "La categoría no fue actualizada"
                }
            } return {
                error: false,
                mensaje: "La categoría fue actualizada"
            }

        } catch (error) {
            throw new Error("Error al obtener la categoría")
        }
    }

    async delete(id) {
        try {
            let datos = await this.getBydId(id)
            // Consulto si tiene productos relacionados
            const tieneProductos = await this.estaRelacionadaConProductos(datos.id)
            if (tieneProductos.length > 0) {
                return {
                    error: true,
                    mensaje: "No puede eliminar la categoría"
                }
            }

            // Elimino la categoría
            const [result] = await connection.query("delete from categorias where id = ?", [id])
            // Valido que no tenga fallas al eliminar
            if (result.affectedRows === 0) {
                return {
                    error: true,
                    mensaje: "Categoría no encontrada"
                }
            }
            // Retorno el mensaje de eliminado correctamente
            return {
                error: false,
                mensaje: "Categoría eliminada exitosamente",
                data: datos
            }
        } catch (error) {
            console.log(error);

        }

    }

    async updatePartial(id, campos) {
        let query = "UPDATE categorias SET ";
        let params = [];
        // Construimos dinámicamente la consulta de actualizar solo con los campos que llegan
        for (const [key, value] of Object.entries(campos)) {
            query += `${key} = ?, `;
            params.push(value)
        }
        // Eliminamos la última coma y el espacio en blanco de la consulta
        query = query.slice(0, -2)
        query += " where id = ?";
        params.push(id)
        try {
            const [result] = await connection.query(query, params)
            if (result.affectedRows === 0) {
                return {
                    error: true,
                    mensaje: "No puede actualizar la categoría"
                }
            } return {
                error: false,
                mensaje: "La categoría fue actualizada"
            }
        } catch (error) {
            throw new Error(error);

        }
    }
}

export default Categoria;

// import connection from "../utils/db.js";

// class Categoria {
//     constructor() {}

//     async getAll() {
//         try {
//             const [rows] = await connection.query("select * from categorias");
//             return {
//                 error: false,
//                 codigo: 200,
//                 mensaje: "Categorías obtenidas exitosamente",
//                 data: rows
//             };
//         } catch (error) {
//             return {
//                 error: true,
//                 codigo: 500,
//                 mensaje: "¡Error al obtener las categorías!",
//                 data: []
//             };
//         }
//     }

//     // Método => crear una categoría
//     async create(nombre, descripcion) {
//         try {
//             const [result] = await connection.query("insert into categorias (nombre, descripcion) values (?, ?)", [nombre, descripcion]);
//             return {
//                 error: false,
//                 codigo: 201,
//                 mensaje: "Categoría creada exitosamente",
//                 data: [{ id: result.insertId, nombre, descripcion }]
//             };
//         } catch (error) {
//             return {
//                 error: true,
//                 codigo: 500,
//                 mensaje: "Error al crear la categoría",
//                 data: []
//             };
//         }
//     }

//     // Método => obtener una categoría por ID
//     async getBydId(id) {
//         try {
//             const [rows] = await connection.query("select * from categorias where id = ?", [id]);

//             if (rows.length === 0) {
//                 return {
//                     error: true,
//                     codigo: 404,
//                     mensaje: "Categoría no encontrada",
//                     data: []
//                 };
//             }

//             return {
//                 error: false,
//                 codigo: 200,
//                 mensaje: "Categoría obtenida exitosamente",
//                 data: rows[0]
//             };
//         } catch (error) {
//             return {
//                 error: true,
//                 codigo: 500,
//                 mensaje: "Error al obtener la categoría",
//                 data: []
//             };
//         }
//     }

//     // Método => comprobar si la categoría está relacionada con productos
//     async estaRelacionadaConProductos(categoria_id) {
//         try {
//             const [rows] = await connection.query("select * from productos where categoria_id = ?", [categoria_id]);
//             return {
//                 error: false,
//                 codigo: 200,
//                 mensaje: "Productos obtenidos exitosamente",
//                 data: rows
//             };
//         } catch (error) {
//             return {
//                 error: true,
//                 codigo: 500,
//                 mensaje: "Error al obtener productos relacionados",
//                 data: []
//             };
//         }
//     }

//     // Método => actualizar categoría
//     async update(id, nombre) {
//         try {
//             const [result] = await connection.query("update productos set nombre = ? where id = ?", [nombre, id]);
//             if (result.affectedRows === 0) {
//                 return {
//                     error: true,
//                     codigo: 400,
//                     mensaje: "La categoría no fue actualizada",
//                     data: []
//                 };
//             }
//             return {
//                 error: false,
//                 codigo: 200,
//                 mensaje: "La categoría fue actualizada",
//                 data: []
//             };
//         } catch (error) {
//             return {
//                 error: true,
//                 codigo: 500,
//                 mensaje: "Error al obtener la categoría",
//                 data: []
//             };
//         }
//     }

//     // Método => eliminar categoría
//     async delete(id) {
//         try {
//             let datos = await this.getBydId(id);
//             // Consulto si tiene productos relacionados
//             const tieneProductos = await this.estaRelacionadaConProductos(datos.data.id);
//             if (tieneProductos.data.length > 0) {
//                 return {
//                     error: true,
//                     codigo: 400,
//                     mensaje: "No puede eliminar la categoría porque está relacionada con productos",
//                     data: []
//                 };
//             }

//             // Elimino la categoría
//             const [result] = await connection.query("delete from categorias where id = ?", [id]);
//             // Valido que no tenga fallas al eliminar
//             if (result.affectedRows === 0) {
//                 return {
//                     error: true,
//                     codigo: 404,
//                     mensaje: "Categoría no encontrada",
//                     data: []
//                 };
//             }

//             return {
//                 error: false,
//                 codigo: 200,
//                 mensaje: "Categoría eliminada exitosamente",
//                 data: datos.data
//             };
//         } catch (error) {
//             return {
//                 error: true,
//                 codigo: 500,
//                 mensaje: "Error al eliminar la categoría",
//                 data: []
//             };
//         }
//     }

//     // Método => actualizar categoría parcialmente
//     async updatePartial(id, campos) {
//         let query = "UPDATE categorias SET ";
//         let params = [];
//         // Construimos dinámicamente la consulta de actualizar solo con los campos que llegan
//         for (const [key, value] of Object.entries(campos)) {
//             query += `${key} = ?, `;
//             params.push(value);
//         }
//         // Eliminamos la última coma y el espacio en blanco de la consulta
//         query = query.slice(0, -2);
//         query += " where id = ?";
//         params.push(id);

//         try {
//             const [result] = await connection.query(query, params);
//             if (result.affectedRows === 0) {
//                 return {
//                     error: true,
//                     codigo: 400,
//                     mensaje: "No puede actualizar la categoría",
//                     data: []
//                 };
//             }

//             return {
//                 error: false,
//                 codigo: 200,
//                 mensaje: "La categoría fue actualizada parcialmente",
//                 data: []
//             };
//         } catch (error) {
//             return {
//                 error: true,
//                 codigo: 500,
//                 mensaje: error.message,
//                 data: []
//             };
//         }
//     }
// }

// export default Categoria;