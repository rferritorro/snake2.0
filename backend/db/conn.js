const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/bd_snake', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('BD conectada con éxito');
        
    } catch (error) {
        console.log(error); 
        process.exit(1)
    }
}

module.exports = conectarDB;