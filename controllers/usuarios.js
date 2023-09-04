const {response, request} = require('express')

const usuariosGet= (req = request, res = response) => {

    const {q,nombre="no name",apikey,page = 1,limit} = req.query;
    res.json({
      msg: "get API - controlador",
      q,
      nombre,
      apikey,
      page,
      limit
    });
  }

   const usuariosPost = (req, res = response) => {

    const {nombre, edad} = req.body;

    res.json({
      msg: "Post API - controlador",
      nombre,
      edad
    });
  }
   const usuariosPut = (req, res = response) => {

    const {id} = req.params;
    res.json({
      msg: "Put API - controladorAA",
      id
    });
  }
   const usuariosDelete = (req, res = response) => {
    res.json({
      msg: "Delete API - controlador",
    });
  }
   const usuariosPatch = (req, res = response) => {
    res.json({
      msg: "Patch API - controlador",
    });
  }
  


  module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
  }