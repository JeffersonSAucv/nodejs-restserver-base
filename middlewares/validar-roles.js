const { response } = require("express")


const esAdminRole = ( req, res = response, next ) => {
    
    if (!req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        })
    }
    const {rol, nombre}  =  req.usuario 

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador - no puede hacer esto`
        })
    }

    next(); // si todo sale bien
} 


//esta funcion ...roles se le conoce como rest operator cuando quieres traer todos 
//los elementos que le envies los alamacena como un array
const tieneRole = ( ...roles ) =>{  
    return (req, res = response, next) => { 
        if (!req.usuario ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            })
        }

        if (!roles.includes( req.usuario.rol )) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            })
            
        }

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}