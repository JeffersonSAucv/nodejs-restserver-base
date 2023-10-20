const { response , request } = require('express');
const { generarJWT} = require('../helpers/generarJWT');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const login = async (req, res = response) => {

    const { correo, password} = req.body;

    console.log('req.body', req.body);
    try {


      //verificar si el correo existe

      const usuario = await Usuario.findOne({correo});

      if (!usuario) {
        return res.status(400).json({
          msg : 'Usuario / contraseña no son correctos - correo'
        })
      }

      // si el usuario esta activo

      
      if (!usuario.estado) {
        return res.status(400).json({
          msg : 'Usuario / contraseña no son correctos - estado : false'
        })
      }

      // verificar la constraseña

      const validPassword   = bcryptjs.compareSync(password, usuario.password);
      if (!validPassword) {
        return res.status(400).json({
          msg : 'Usuario / contraseña no son correctos - password'
        })
      }


      // generar el JWT
      const token = await generarJWT(usuario.id);

      res.json({
       usuario,
       token
      })
      
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg : 'Hable con el administrador'
      })
    }


  
  }

module.exports = {
    login
}