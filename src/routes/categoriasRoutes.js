import express from 'express';
import CategoriasController from '../controllers/CategoriasController.js';
import validarDatos from '../middlewares/createCategoria.js';
import Categoria from '../models/Categoria.js';

const router = express();

router.get('/', CategoriasController.getAllCategorias);

router.post('/', validarDatos, CategoriasController.createCategoria);

router.put('/:id', validarDatos, CategoriasController.updateCategoria);

router.patch('/:id', validarDatos, CategoriasController.updatePartial);

router.delete('/:id', CategoriasController.deleteCategoria)

export default router;