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

// Procesar mensajes recibidos
ws.onmessage = function (event) {
    const message = event.data;
    
    // Solo procesar los mensajes de chat
    if (message.includes('PRIVMSG')) {
        const username = message.split('!')[0].substring(1);
        const chatMessage = message.split('PRIVMSG')[1].split(':')[1];
        
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.innerHTML = `<strong>${username}:</strong> ${chatMessage}`;
        chatContainer.appendChild(bubble);

        // Hacer que el chat se desplace automáticamente hacia abajo
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
};
