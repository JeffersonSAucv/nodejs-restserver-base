const { Router } = require("express");

const { validarCampos } = require("../middlewares/validar-campos");
const { login } = require("../controllers/auth");
const { check } = require("express-validator");

const router = Router();

router.post("/",
check('correo', 'El correo no es valido').isEmail(),
check('password', 'La contraseña es obligatoria').not().isEmpty(),
validarCampos

,login);

module.exports = router;
