const { Router } = require("express");
const { check } = require("express-validator");

const { validarJWT,validarCampos } = require("../middlewares");

const { existeCategoria, existeProducto } = require("../helpers/db-validators");
const { crearProducto, obtenerProducto, actualizarProducto, borrarProducto, obtenerProductos } = require("../controllers/productos");


const router = Router();


// obtener productos
router.get("/",obtenerProductos);

// obtener productos
router.get("/:id",[
    check('id', 'El ID ingresado, no es un ID de Mongo válido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],obtenerProducto); 

//crear producto

router.post("/",[
    //validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'El ID ingresado, no es un ID de Mongo válido').isMongoId(),
    validarCampos
], crearProducto)

// Actualizar - Privado - Cualquiera con token valido
router.put("/:id", [
    //validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'El ID ingresado, no es un ID de Mongo válido').isMongoId(),
    check('disponible', 'el estado es invalido').isBoolean(),
    check('id').custom(existeProducto),
    validarCampos
  ],actualizarProducto)

// Borrar - Privado - Con Rol Admin
router.delete("/:id",[
    //validarJWT,
    check('id', 'No es un ID de mongo válido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
  ],borrarProducto)

module.exports = router;
