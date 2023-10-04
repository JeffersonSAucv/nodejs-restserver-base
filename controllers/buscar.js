const {  response} = require("express");
const { ObjectId } = require("mongoose").Types;
const {Usuario,Categoria,Producto} = require('../models')

const coleccionPermitidas = ['usuarios', 'productos', 'categorias', 'roles']

const buscarUsarios = async(termino = '', res = response)=>{

    const esMongoID = ObjectId.isValid(termino);  //true
    let usuarios = [];

    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        if (usuario && usuario.estado) {
            usuarios.push(usuario);
        } else {
            res.status(400).json({
                msg: 'El usuario con el ID proporcionado no es válido o no está activo.',
                resultados: [],
            });
            return;
        }
    } else {
        const regex = new RegExp(termino, 'i');
        //console.log(regex);
        usuarios = await Usuario.find({ 
            $or: [{nombre: regex}, {correo: regex},{estado: true}],
            $and: [{estado: true}]
         });
    }

    if (usuarios.length === 0) {
        res.status(400).json({
            msg: esMongoID ? 'El ID no es válido.' : 'No se encontraron usuarios con el nombre proporcionado.',
            resultados: [],
        });
    } else {
        res.json({
            resultados: usuarios,
        });
    }  
}

const buscarProductos = async(termino = '', res = response)=>{

    const esMongoID = ObjectId.isValid(termino);  //true

    let productos = [];

    if (esMongoID) {
        const producto = await Producto.findById(termino).populate('categoria', 'nombre');
        if (producto && producto.estado) {
            productos.push(producto);
        }else {
            res.status(400).json({
                msg: 'El producto con el ID proporcionado no es válido o no está activo.',
                resultados: [],
            });
            return;
        }
    } else {
        const regex = new RegExp(termino, 'i');
        //console.log(regex);
        productos = await Producto.find({nombre:regex, estado: true})
                                  .populate('categoria', 'nombre');  //mostrar categoria del producto
    }

    if (productos.length === 0) {
        res.status(400).json({
            msg: esMongoID ? 'El ID no es válido.' : 'No se encontraron productos con el nombre proporcionado.',
            resultados: [],
        });
    } else {
        res.json({
            resultados: productos,
        });
    }

    
    
}

const buscarCategorias = async(termino = '', res = response)=>{

    const esMongoID = ObjectId.isValid(termino);  //true

    let categorias = [];

    if (esMongoID) {
        const categoria = await Categoria.findById(termino);
        if (categoria && categoria.estado) {
            categorias.push(categoria);
        } else {
            res.status(400).json({
                msg: 'La categoría con el ID proporcionado no es válida o no está activa.',
                resultados: [],
            });
            return;
        }
    } else {
        const regex = new RegExp(termino, 'i');
        //console.log(regex);
        categorias = await Categoria.find({nombre:regex, estado: true});
    }

    if (categorias.length === 0) {
        res.status(400).json({
            msg: esMongoID ? 'El ID no es válido.' : 'No se encontraron categorias con el nombre proporcionado.',
            resultados: [],
        });
    } else {
        res.json({
            resultados: categorias,
        });
    }
}


const buscar  = (req , res =  response)=>{

    const {coleccion, termino} = req.params

    if (!coleccionPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg : `Las colecciones permitidas son ${coleccionPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios' :
             buscarUsarios(termino, res);
        break;
        case 'productos' :
            buscarProductos(termino, res);
             break;    
        case 'categorias' :
            buscarCategorias(termino, res);
        break;   
        default :
            res.status(500).json({ 
                msg : 'Se me olvido hacer esta busqueda'
            })        
    }

}



module.exports = {
    buscar
}