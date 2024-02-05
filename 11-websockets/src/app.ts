import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {

  console.log("Client connected");

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    // console.log('Mensaje del cliente: ', data);
    // ws.send( data.toString().toUpperCase() );
    const payload = JSON.stringify({
      type: 'custom-message',
      payload: data.toString()
    });
    // ws.send( JSON.stringify( payload ) );

    //* TODOS - incluyente
    // wss.clients.forEach(function each(client) {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send(payload, { binary: false });
    //   }  
    // });  
    //* TODOS - excluyente
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(payload, { binary: false });
      }
    });


  });

  // ws.send('Hola desde el servidor');

  // ws.on('close', () => {
  //   console.log("Client disconnected");
  // });

  // setInterval(() => {
  //   ws.send("Hola de nuevo");
  // }, 2000);
});

// console.log("http://localhost:3000");