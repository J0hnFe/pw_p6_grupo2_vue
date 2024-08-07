import axios from "axios";

// Consultar Cliente por Cedula:
const consultarClientePorCedula = async (cedula) => {
    const info = axios.get(`http://localhost:8082/API/v1.0/Renta/clientes/${cedula}`).then(r => r.data)
    console.log(info);
    return info;
}

// Guardar Cliente:
const guardarCliente = async (body) => {
    try {
        const response = await axios.post(`http://localhost:8082/API/v1.0/Renta/clientes`, body);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Actualizar Cliente Parcial (Sin cedula): 
const actualizarClienteParcial = async (id, body) => {
    const info = axios.patch(`http://localhost:8082/API/v1.0/Renta/clientes/${id}`, body).then(r => r.data)
    console.log(info);
}


//////////////////////////////////////////////// METODOS FACHADA:////////////////////////////////////////////////////////////
export const consultarClientePorCIFachada = async (id) => {
    return await consultarClientePorCedula(id);
}

export const insertarClienteFachada = async (body) => {
    try {
        const response = await guardarCliente(body);
        return response;
    } catch (error) {
        throw error;
    }
}

export const actualizarClienteParcialFachada = async (id, body) => {
    return await actualizarClienteParcial(id, body);
}

// Vehiculo
const consultarVehiculoPorMarcaYModelo = async (marca, modelo) => {
    const info = await axios.get(`http://localhost:8082/API/v1.0/Renta/vehiculos/buscarAutos?marca=${marca}&modelo=${modelo}`).then(r => r.data)
    console.log("helper: ", info);
    return info;
}
export const consultarVehiculoPorMarcaYModeloFachada = async (marca, modelo) => {
    return await consultarVehiculoPorMarcaYModelo(marca, modelo);
}

// Renta:
const guardarRenta = async (body) => {
    try {
        const response = await axios.post(`http://localhost:8082/API/v1.0/Renta/clientes/generarReserva`, body);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const guardarRentaFachada = async (body) => {
    try {
        const response = await guardarRenta(body);
        return response;
    } catch (error) {
        throw error;
    }
}

const consultarValorTotal = async (body) => {
    console.log("helper", body);
    const info = axios.post(`http://localhost:8082/API/v1.0/Renta/clientes/cotizar`, body).then(r => r.data)
    console.log(info);
    return info;
}

export const consultarValorTotalFachada = async (body) => {
    return await consultarValorTotal(body);
}

// Consultar Reserva por Placa desde Cliente:
const consultarReservaPorPlaca = async (placa) => {
    const info = await axios.get(`http://localhost:8082/API/v1.0/Renta/clientes/reservas/${placa}`).then(r => r.data)
    console.log(info);
    return info;
}
export const consultarReservaPorPlacaFachada = async (placa) => {
    return await consultarReservaPorPlaca(placa);
}

// Consultar Reserva por Cedula desde Cliente:
const consultarfechasRentasPorVehiculo = async (placa) => {
    const info = await axios.get(`http://localhost:8082/API/v1.0/Renta/clientes/fechas/${placa}`).then(r => r.data);
    console.log("helper: ", info);
    return info;
}
export const consultarfechasRentasPorVehiculoFachada = async (placa) => {
    return await consultarfechasRentasPorVehiculo(placa);
}
