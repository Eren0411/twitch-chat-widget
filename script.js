const chatContainer = document.getElementById('chat');

// Conectar a Twitch IRC a través de WebSocket
const ws = new WebSocket('wss://irc-ws.chat.twitch.tv:443');

// Cuando la conexión se abre
ws.onopen = function () {
    // Autenticación básica para Twitch
    ws.send('PASS oauth:mtt827eirkwdlfshpvvmb8923g3ofq'); // Reemplaza con tu token OAuth
    ws.send('Eren0411os'); // Reemplaza con tu nombre de usuario
    ws.send('JOIN eren0411os'); // Reemplaza con tu canal (sin la #)
};

// Escuchar mensajes del WebSocket
ws.onmessage = function (event) {
    const message = event.data.trim();
    console.log("Mensaje recibido: ", message);

    // Solo procesar los mensajes que contienen PRIVMSG
    if (message.includes('PRIVMSG')) {
        const username = message.split('!')[0].substring(1);
        const chatMessage = message.split('PRIVMSG')[1].split(':')[1];

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

