const  validarCampos  = require("./validar-campos");
const  validarJWT  = require("./validar-jwt");
const  tieneRole  = require("./validar-roles");


module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...tieneRole
}