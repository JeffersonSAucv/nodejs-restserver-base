const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '', oculto = 'ella no te ama uu' ) => {
    return new Promise( ( resolve, reject ) => {
        const payload = { uid,oculto };
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {
            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' );
            } else {
                resolve( token );
            }
        })
    })  
}


module.exports = {
    generarJWT
}