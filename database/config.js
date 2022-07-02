const mongoose = require('mongoose');


//Función asincrona
const conexion = async()=>{

    try {
        await mongoose.connect( process.env.MONGODB_LOCAL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            //useCreateIndex: true,
            //useFindAndModify: false
        });

        console.log('Base de datos conectada'); 
        
    } catch (error) {
        console.log(error);
        throw new Error('Error de inicio de base de datos');
    }

}

//Exportar por nombre si se que haré después mas conexiones

module.exports ={
    conexion
}