const { Alquiler, Cliente, Autos } = require('../models');

// Realizar un nuevo alquiler
exports.realizarAlquiler = async (req, res) => {
    const { clienteId, autoId, fechaInicio, fechaFin } = req.body;
    try {
        const auto = await Autos.findByPk(autoId);
        if (auto && auto.disponibilidad === 1) {
            const cliente = await Cliente.findByPk(clienteId);
            if (!cliente) {
                return res.json({ mensaje: "El cliente no existe" });
            }

            const alquiler = await Alquiler.create({
                clienteId,
                autoId,
                fechaInicio,
                fechaFin
            });

            await auto.update({ disponibilidad: 0 });

            res.json(alquiler);
        } else {
            res.json({ mensaje: "El auto no está disponible o no existe" });
        }
    } catch (e) {
        console.error(e);
        res.json({ mensaje: "Error al registrar el alquiler", error: e.message });
    }
};

// Historial completo de alquileres
exports.historial = async (req, res) => {
    try {
        const alquileres = await Alquiler.findAll({
            include: [
                {
                    model: Cliente,
                    as: 'clientes',
                    attributes: ['nombre', 'correo', 'numLic']
                },
                {
                    model: Autos,
                    as: 'autos',
                    attributes: ['marca', 'modelo', 'imagen', 'valorAlquiler', 'anio']
                }
            ]
        });
        res.json(alquileres);
    } catch (e) {
        console.error(e);
        res.json({ mensaje: "Error al obtener el historial de alquileres", error: e.message });
    }
};

// Alquileres de un cliente específico
exports.alquileresPorCliente = async (req, res) => {
    const { clienteId } = req.params;
    try {
        const alquileres = await Alquiler.findAll({
            where: { clienteId },
            include: [
                {
                    model: Autos,
                    as: 'autos',
                    attributes: ['marca', 'modelo', 'imagen', 'valorAlquiler', 'anio', 'disponibilidad']
                }
            ]
        });
        return res.status(200).json({ alquileres });
    } catch (e) {
        console.error('Error alquileresPorCliente:', e);
        return res.status(500).json({ 
            mensaje: "Error al obtener alquileres del cliente",
            error: e.message 
        });
    }
};

// Devolver un vehículo (cambia disponibilidad a 1)
exports.devolverVehiculo = async (req, res) => {
    const { alquilerId } = req.params;
    try {
        const alquiler = await Alquiler.findByPk(alquilerId);
        if (!alquiler) {
            return res.status(404).json({ mensaje: "Alquiler no encontrado" });
        }

        const auto = await Autos.findByPk(alquiler.autoId);
        if (!auto) {
            return res.status(404).json({ mensaje: "Auto no encontrado" });
        }

        // Marcar el auto como disponible nuevamente
        await auto.update({ disponibilidad: 1 });

        res.json({ mensaje: "Vehículo devuelto exitosamente", alquiler });
    } catch (e) {
        console.error(e);
        res.json({ mensaje: "Error al devolver el vehículo", error: e.message });
    }
};