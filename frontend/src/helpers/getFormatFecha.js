export const getFormatFecha = (fechaStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', options);
};