const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

    wss.on('connection', (ws) => {
    wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === ws.OPEN) {
        client.send(data);
        }
      });
    };
    const msgSize =  wss.clients.size;
    wss.broadcast(JSON.stringify({type: "userConnected",id: uuidv1(), content : wss.clients.size}));

    ws.on('message', function incoming(message) {
      const obj = JSON.parse(message);
    switch(obj.type) {
      case "postMessage":
        wss.broadcast(JSON.stringify({type: "incomingMessage",id: uuidv1(), username: obj.username, content : obj.content}));
        break;
      case "postNotification":
        wss.broadcast(JSON.stringify({type: "incomingNotification", id: uuidv1(),content:obj.content }));
        break;
      default:
        throw new Error("Unknown event type " + obj.type);
    }


  });

  ws.on('close', () => {
    console.log('Client disconnected');

   wss.broadcast(JSON.stringify({type: "userConnected", id: uuidv1(),content:wss.clients.size}));

 });

});