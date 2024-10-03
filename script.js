const ws = new WebSocket('wss://pubsub-edge.twitch.tv');

// Cuando la conexión se abre
ws.onopen = function () {
    // Enviar el mensaje para escuchar el canal (reemplaza <token> y <user_id> con tus valores)
    const message = {
        type: "LISTEN",
        nonce: "44h1k13746815ab1r2",
        data: {
            topics: [`chat_moderator_actions.Eren0411os.eren0411os`], // Cambia user_id y channel_id
            auth_token: "h0z2o4yib6iyqzcdf88fv5yufkzphg"
        }
    };
    
    ws.send(JSON.stringify(message));
    console.log("Conexión establecida y escuchando mensajes de chat...");
};

// Recibir mensajes de Twitch PubSub
ws.onmessage = function (event) {
    const response = JSON.parse(event.data);

    if (response.type === "MESSAGE") {
        const messageData = response.data.message;
        console.log("Mensaje recibido en el canal:", messageData);
        
        // Aquí puedes procesar y mostrar los mensajes en tu widget
    }
};

// Manejar errores de WebSocket
ws.onerror = function (error) {
    console.error("Error en la conexión WebSocket:", error);
};

// Manejar el cierre de la conexión
ws.onclose = function () {
    console.log("Conexión WebSocket cerrada.");
};

