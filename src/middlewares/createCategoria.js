const validarDatos = (req, res, next) => {
    const { nombre, descripcion } = req.body;
    if (!nombre || nombre.trim() === "") {
        return res
            .status(400)
            .json({ error: true, codigo: 400, mensaje: "El nombre es obligatorio", data: [] });
    }
    if (!descripcion || descripcion.trim() === "") {
        return res
            .status(400)
            .json({ error: true, codigo: 400, mensaje: "La descripción es obligatoria", data: [] });
    }
    console.log("Paso la validación");
    next();
};

export default validarDatos;
