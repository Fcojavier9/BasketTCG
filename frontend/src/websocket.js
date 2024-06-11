// Asegúrate de reiniciar tu servidor de desarrollo después de agregar el archivo .env
const WEBSOCKET_URL = "wss://api.aetherdocks.xyz";

function setupWebSocket() {
    try {
        const socket = new WebSocket(WEBSOCKET_URL);

        socket.onopen = () => {
            console.log('WebSocket is connected.');
        };

        socket.onmessage = (event) => {
            console.log('Message from server ', event.data);
        };

        socket.onerror = (error) => {
            console.error('WebSocket error: ', error);
        };

        socket.onclose = () => {
            console.log('WebSocket is closed now.');
        };
    } catch (error) {
        console.error('Failed to setup WebSocket:', error);
    }
}

export default setupWebSocket;