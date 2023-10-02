const { Router } = require("express");
const { check } = require("express-validator");

const { validarJWT,validarCampos } = require("../middlewares");
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require("../controllers/categorias");
const { existeCategoria } = require("../helpers/db-validators");


const router = Router();




router.get("/",obtenerCategorias);

router.get("/:id",
  [
    check('id', 'No es un ID ee mongo válido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
  ],
  obtenerCategoria)

//crear cateogria privado - con token
router.post("/",[
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  validarCampos
],crearCategoria)

// Actualizar - Privado - Cualquiera con token valido
router.put("/:id", [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('id', 'No es un ID de mongo válido').isMongoId(),
  check('id').custom(existeCategoria),
  validarCampos
],actualizarCategoria)

// Borrar - Privado - Con Rol Admin
router.delete("/:id",[
  validarJWT,
  check('id', 'No es un ID de mongo válido').isMongoId(),
  check('id').custom(existeCategoria),
  validarCampos
],borrarCategoria)

module.exports = router;
