const chatContainer = document.getElementById('chat-container');

// Conectar a Twitch IRC a través de WebSocket
const ws = new WebSocket('wss://irc-ws.chat.twitch.tv:443');

// Cuando la conexión se abre
ws.onopen = function () {
    ws.send('PASS oauth:wb6p26z2kmpb4207zsscebjbqnfyhw'); // Reemplaza con tu token OAuth real
    ws.send('NICK Eren0411os'); // Reemplaza con tu nombre de usuario
    ws.send('JOIN #eren0411os'); // Reemplaza con el nombre de tu canal (incluyendo el #)
};

// Escuchar mensajes del WebSocket

ws.onmessage = function (event) {
    const message = event.data.trim();
    console.log("Mensaje recibido: ", message);

    // Solo procesar mensajes que contienen PRIVMSG (indican mensajes del chat)
    if (message.includes('PRIVMSG')) {
        const messageParts = message.split(' '); // Dividir por espacio
        const username = messageParts[1].split('!')[0]; // Obtener el nombre del usuario
        const chatMessage = message.substring(message.indexOf('PRIVMSG') + 1).split(':')[1]; // Obtener el contenido del mensaje

        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.innerHTML = `<strong>${username}:</strong> ${chatMessage}`;
        chatContainer.appendChild(bubble);

        // Desplazar el contenedor de chat hacia abajo
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
};


// Manejar errores
ws.onerror = function (error) {
    console.error("Error de WebSocket: ", error);
};

// Manejar cierre de conexión
ws.onclose = function () {
    console.log("Conexión cerrada");
};

