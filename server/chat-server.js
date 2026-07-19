const { WebSocketServer } = require('ws');
const { createClient } = require('redis');

const PORT = process.env.PORT || 8080;
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

console.log(`Starting chat server on port ${PORT}...`);
console.log(`Connecting to Redis at ${REDIS_URL}...`);

// Initialize Redis client for publishing
const pubClient = createClient({ url: REDIS_URL });
// Initialize Redis client for subscribing
const subClient = pubClient.duplicate();

const localSockets = new Set();

async function startServer() {
  try {
    await pubClient.connect();
    await subClient.connect();
    console.log('Connected to Redis successfully.');

    // Create the WebSocket Server
    const wss = new WebSocketServer({ port: PORT });

    // Handle incoming connections
    wss.on('connection', (ws) => {
      localSockets.add(ws);
      console.log(`Client connected. Total local connections: ${localSockets.size}`);

      // Handle incoming messages from the browser client
      ws.on('message', async (data) => {
        try {
          const parsed = JSON.parse(data.toString());
          
          // Construct message with server-side metadata/timestamp
          const messageObj = {
            id: Math.random().toString(36).substring(2, 9),
            uid: parsed.uid || 'anon',
            displayName: parsed.displayName || 'Anonymous Pilgrim',
            photoURL: parsed.photoURL || null,
            text: parsed.text || '',
            timestamp: Date.now(),
          };

          // Publish to Redis Pub/Sub channel so all node instances hear it
          await pubClient.publish('chat:messages', JSON.stringify(messageObj));
        } catch (err) {
          console.error('Failed to parse or publish message:', err);
        }
      });

      // Handle client disconnect
      ws.on('close', () => {
        localSockets.delete(ws);
        console.log(`Client disconnected. Total local connections: ${localSockets.size}`);
      });

      ws.on('error', (err) => {
        console.error('Socket error:', err);
        localSockets.delete(ws);
      });
    });

    // Subscribe to Redis chat channel to sync messages across horizontal server nodes
    await subClient.subscribe('chat:messages', (messageStr) => {
      // Broadcast the message to all clients connected to this specific Node.js server
      for (const client of localSockets) {
        if (client.readyState === 1) { // 1 means OPEN
          client.send(messageStr);
        }
      }
    });

    console.log(`WebSocket Server is listening on ws://localhost:${PORT}`);
  } catch (err) {
    console.error('Failed to start chat server:', err);
    process.exit(1);
  }
}

startServer();
