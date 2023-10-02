const { response, request } = require("express");
const {Categoria} = require("../models");



// obtenerCategorias - paginas - total - populate

const obtenerCategorias = async (req = request, res = response)=>{
    const {limite = 10, desde = 0} = req.query;
    const query = {estado : true}

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('usuario', 'nombre')
        .skip(desde)
        .limit(limite)
    ]);

    res.status(200).json({
        total,
        categorias
    })
}

// ObtenerCategoria - populate

const obtenerCategoria = async (req = request, res = response)=>{
    const  {id} = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');
    
  res.status(200).json(categoria);
    
}

const crearCategoria =async (req , res = response)=>{

    const nombre  = req.body.nombre.toUpperCase();

    const categoriaDB = await  Categoria.findOne({nombre});

    if(categoriaDB){
        return res.status(400).json({
            msg : `La categoria ${nombre} ya existe en BD`
        })
    }

    // Generar la data a guardar

    const data = {
        nombre,
        usuario: req.usuario._id
    }
    
    const categoria = new Categoria(data);

    //Guardar en DB

    await categoria.save();

    res.status(201).json(categoria);
}

// actualizarCategoria

const actualizarCategoria =async (req , res = response)=>{
    const {id} = req.params;
    const {estado ,usuario, ...resto} = req.body;

    resto.nombre = resto.nombre.toUpperCase();
    resto.usuario = req.usuario._id
    
    const categoria = await Categoria.findByIdAndUpdate(id, resto, {new : true});

    res.json(categoria);
}

// borrarCategoria

const borrarCategoria =async (req , res = response)=>{
    const {id} = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, {estado : false}, {new : true});
    res.json(categoria);
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}