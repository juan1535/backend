import Categoria from "../models/Categoria.js";

class CategoriasController {
    static async getAllCategorias(req, res) {
        const OBJCategoria = new Categoria();
        const categorias = await OBJCategoria.getAll();
        return res.json(categorias);
    }
    // Método crear categoría
    static async createCategoria(req, res) {
        const { nombre, descripcion } = req.body;
        const OBJCategoria = new Categoria();
        const categorias = await OBJCategoria.create(nombre, descripcion);
        return res.json(categorias)
    }

    //Método eliminar categoría
    static async deleteCategoria(req, res) {
        const { id } = req.params;
        const OBJCategoria = new Categoria();
        const categoria = await OBJCategoria.delete(id)
        return res.json(categoria);
    }

    static async updateCategoria(req, res) {
        // Obtener el id y el nombre
        const { id } = req.params
        const { nombre } = req.body
        const OBJCategoria = new Categoria()
        const data = await OBJCategoria.update(id, nombre);
        return res.json(data);
    }

    static async updatePartial(req, res) {
        // Obtener el id y el nombre
        const { id } = req.params
        const campos = req.body
        const OBJCategoria = new Categoria()
        const data = await OBJCategoria.updatePartial(id, campos);
        return res.json(data);
    }
}

export default CategoriasController;