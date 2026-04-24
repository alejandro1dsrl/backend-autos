const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const alquilerR = require('./routes/alquilerroutes');
const autosR = require('./routes/autosroutes');
const clientesR = require('./routes/clienteroutes');



// Definir el puerto con un valor predeterminado
const PORT = process.env.PORT || 6001;

// Middleware para analizar JSON
app.use(cors());
app.use(express.json());

// Prefijos para cada conjunto de rutas
app.use('/api/alquiler', alquilerR);
app.use('/api/autos', autosR);
app.use('/api/clientes', clientesR);


//sequelize.sync({ force: false }) // 'force: false' para no borrar datos existentes
//  .then(() => console.log('Tablas sincronizadas'))
//  .catch(err => console.log('Error al sincronizar:', err));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});