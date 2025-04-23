const validarDatos = (req, res, next) => {
    const { nombre, descripcion } = req.body;
    if (!nombre || nombre.trim() === "") {
        return res
            .status(400)
            .json({ mensaje: "El nombre es obligatorio" });
    } if (!descripcion || descripcion.trim() === "") {
        return res
            .status(400)
            .json({ mensaje: "La descripción es obligatorio" });
    }
    console.log("Paso la validación");
    next()
}

export default validarDatos;

// const $validarDatos = (req, res, next) => {
//     // Desestructuramos todos los campos del body
//     const { nombre, descripcion, ...otrosCampos } = req.body;

//     // Creamos un objeto con todos los campos a validar
//     const campos = { nombre, descripcion, ...otrosCampos };

//     // Iteramos sobre todos los campos para validar que no estén vacíos
//     for (let campo in campos) {
//         if (!campos[campo] || campos[campo].trim() === "") {
//             return res.status(400).json({ mensaje: `El campo ${campo} es obligatorio` });
//         }
//     }

//     console.log("Paso la validación");
//     next();
// };

// export default validarDatos;
