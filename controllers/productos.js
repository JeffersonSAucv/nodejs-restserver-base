const { response, request } = require("express");
const {Producto} = require("../models");



const obtenerProductos= async (req = request, res = response)=>{
    const {limite = 10, desde = 0} = req.query;
    const query = {estado : true}

    const [total, producto] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .skip(desde)
        .limit(limite)
    ]);

    res.status(200).json({
        total,
        producto
    })
}

const obtenerProducto = async (req = request, res = response)=>{
    const  {id} = req.params;
    const categoria = await Producto.findById(id).populate('usuario', 'nombre');
    
  res.status(200).json(categoria);
    
}

// const crearProducto =async (req , res = response)=>{
//     try {
//     const {estado,usuario, ...body}  = req.body;
    
//     console.log(body.nombre);
//     const productoDB = await  Producto.findOne({nombre : body.nombre});
//     console.log(productoDB);

//     if(productoDB){
//         return res.status(400).json({
//             msg : `El producto ${productoDB.nombre} ya existe en BD`
//         })
//     }

//     // Generar la data a guardar

//     const data = {
//         nombre : body.nombre.toUpperCase(),
//         categoria: body.categoria,
//         descripcion : body.descripcion ,
//         disponible: body.disponible,
//         precio: body.precio,
//         //usuario: req.usuario._id
//         usuario: '64fe54ea7c5a015e6bf1032b'
//     }
    
//     const producto = new Producto(data);

//     //Guardar en DB

//     await producto.save();

//     res.status(201).json(producto);

// } catch (error) {
//     console.error(error);
//     res.status(500).json({
//         msg: 'Hubo un error al crear el producto. Por favor, inténtalo de nuevo.'
//     });
// }
// };



// actualizarCategoria

const crearProducto = async (req, res = response) => {
    try {
        const { estado, usuario, ...body } = req.body;

        // Generar la data a guardar
        const data = {
            nombre: body.nombre.toUpperCase(),
            categoria: body.categoria,
            descripcion: body.descripcion,
            disponible: body.disponible,
            precio: body.precio,
            usuario: '64fe54ea7c5a015e6bf1032b' // Cambiar por la lógica de autenticación
        };

        const producto = new Producto(data);

        // Guardar en DB
        await producto.save();

        res.status(201).json(producto);
    } catch (error) {
        if (error.code === 11000) {
            // Error de clave duplicada
            res.status(400).json({
                msg: 'El producto ya existe en la base de datos.'
            });
        } else {
            // Otro tipo de error
            console.error(error);
            res.status(500).json({
                msg: 'Hubo un error al crear el producto. Por favor, inténtalo de nuevo.'
            });
        }
    }
};

const actualizarProducto =async (req , res = response)=>{
    const {id} = req.params;
    const {estado ,usuario, ...resto} = req.body;

    resto.nombre = resto.nombre.toUpperCase();
    resto.usuario = req.usuario._id
    
    const producto = await Producto.findByIdAndUpdate(id, resto, {new : true});

    res.json(producto);
}

// borrarCategoria

const borrarProducto =async (req , res = response)=>{
    const {id} = req.params;
    const producto = await Producto.findByIdAndUpdate(id, {estado : false}, {new : true});
    res.json(producto);
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}