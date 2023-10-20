const { response, request } = require('express');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');


const validarJWT = async  (req = request, res = response, next) =>{
        
        const token = req.header('x-token');
        console.log('x-token', req.header('x-token'));

        if (!token) {
            
            return res.status(401).json({
                msg: 'No hay token en la petición'
            })
        }

        try {
        

             const {uid} =  jwt.verify(token, process.env.SECRETORPRIVATEKEY);
            console.log('validacion token',  jwt.verify(token, process.env.SECRETORPRIVATEKEY));
             //leer el usuario que corresponde uid
             const usuario= await Usuario.findById(uid);

             if(!usuario){
                return res.status(401).json({
                    msg: 'Token no valido - usuario no existe DB'
                })
             }
            
             // verificar si el uid tiene estado en true

             if (!usuario.estado) {
                 return res.status(401).json({
                     msg: 'Token no valido - usuario con estado false'
                 })
             }
             
             req.usuario = usuario;
        
            next();

        } catch (error) {
            console.log(error);
            res.status(401).json({
                msg: 'Token no valido'
            })
        }   

    }


module.exports ={
    validarJWT
}