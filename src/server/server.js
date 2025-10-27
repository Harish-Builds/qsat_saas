// Serial to WebSocket Bridge Server with Pause/Resume Control
// Make sure to install dependencies first: npm install

const WebSocket = require('ws');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const HTTP_PORT = 3001;
const WS_PORT = 8080;

// ⚠️ IMPORTANT: Configure your Arduino port here
const SERIAL_CONFIG = {
  path: 'COM11', // Windows: COM3, COM4, etc. | Mac: /dev/tty.usbmodem* | Linux: /dev/ttyUSB0, /dev/ttyACM0
  baudRate: 115200, // Must match your Arduino Serial.begin() rate
};

// Create WebSocket server
const wss = new WebSocket.Server({ port: WS_PORT });

let serialPort = null;
let parser = null;
let connectedClients = new Set();
let isMonitoring = true; // Server-side monitoring state

// Initialize Serial Port
function initializeSerialPort() {
  try {
    console.log('\n🔌 Attempting to connect to Arduino...');
    console.log(`   Port: ${SERIAL_CONFIG.path}`);
    console.log(`   Baud Rate: ${SERIAL_CONFIG.baudRate}`);

    serialPort = new SerialPort({
      path: SERIAL_CONFIG.path,
      baudRate: SERIAL_CONFIG.baudRate,
      autoOpen: true,
    });

    parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));

    serialPort.on('open', () => {
      console.log('✅ Serial port opened successfully!');
      console.log(`   Connected to: ${SERIAL_CONFIG.path} @ ${SERIAL_CONFIG.baudRate} baud\n`);
      
      broadcastToClients({
        type: 'SYSTEM_STATUS',
        message: 'Serial connection established',
        timestamp: new Date().toISOString(),
      });
    });

    parser.on('data', (data) => {
      // Only process data if monitoring is active
      if (!isMonitoring) {
        return; // Skip processing when paused
      }

      const trimmedData = data.trim();
      if (trimmedData) {
        console.log('📡 Arduino:', trimmedData);
        
        // Broadcast data to all connected WebSocket clients
        const message = {
          type: 'SERIAL_DATA',
          data: trimmedData,
          timestamp: new Date().toISOString(),
        };
        
        broadcastToClients(message);
      }
    });

    serialPort.on('error', (err) => {
      console.error('❌ Serial port error:', err.message);
      console.error('\n💡 Common issues:');
      console.error('   - Wrong COM port (check Arduino IDE > Tools > Port)');
      console.error('   - Arduino not connected');
      console.error('   - Port already in use (close Arduino IDE Serial Monitor)');
      console.error('   - Permission denied (try running as administrator)\n');
      
      broadcastToClients({
        type: 'ERROR',
        message: err.message,
        timestamp: new Date().toISOString(),
      });
    });

    serialPort.on('close', () => {
      console.log('🔌 Serial port closed');
      broadcastToClients({
        type: 'SYSTEM_STATUS',
        message: 'Serial connection closed',
        timestamp: new Date().toISOString(),
      });
    });

  } catch (error) {
    console.error('❌ Failed to initialize serial port:', error.message);
    console.error('\n💡 Make sure:');
    console.error('   1. Arduino is connected via USB');
    console.error('   2. Correct COM port is set in SERIAL_CONFIG');
    console.error('   3. Arduino IDE Serial Monitor is closed');
    console.error('   4. You have necessary permissions\n');
  }
}

// Broadcast message to all connected WebSocket clients
function broadcastToClients(message) {
  const messageStr = JSON.stringify(message);
  const clientCount = connectedClients.size;
  
  if (clientCount > 0) {
    connectedClients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(messageStr);
      }
    });
  }
}

// WebSocket connection handler
wss.on('connection', (ws, req) => {
  const clientIp = req.socket.remoteAddress;
  console.log(`🌐 New WebSocket client connected from ${clientIp}`);
  console.log(`   Total clients: ${connectedClients.size + 1}`);
  
  connectedClients.add(ws);

  // Send connection confirmation with current monitoring state
  ws.send(JSON.stringify({
    type: 'CONNECTION',
    message: 'Connected to Arduino serial bridge',
    timestamp: new Date().toISOString(),
    serialConnected: serialPort ? serialPort.isOpen : false,
    isMonitoring: isMonitoring,
  }));

  // Handle messages from web client
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      
      // Handle pause/resume commands
      if (data.command === 'pause') {
        isMonitoring = false;
        console.log('⏸️  PAUSED - Server stopped reading serial data');
        broadcastToClients({
          type: 'SYSTEM_STATUS',
          message: 'Server monitoring paused',
          timestamp: new Date().toISOString(),
          isMonitoring: false,
        });
      } else if (data.command === 'resume') {
        isMonitoring = true;
        console.log('▶️  RESUMED - Server reading serial data');
        broadcastToClients({
          type: 'SYSTEM_STATUS',
          message: 'Server monitoring resumed',
          timestamp: new Date().toISOString(),
          isMonitoring: true,
        });
      }
      
      // Handle send commands to Arduino
      else if (data.command === 'send' && serialPort && serialPort.isOpen) {
        console.log('📤 Sending to Arduino:', data.data);
        serialPort.write(data.data + '\n', (err) => {
          if (err) {
            console.error('❌ Error writing to serial:', err);
            ws.send(JSON.stringify({
              type: 'ERROR',
              message: 'Failed to send data to Arduino',
              timestamp: new Date().toISOString(),
            }));
          }
        });
      }
    } catch (error) {
      console.error('❌ Error processing message:', error);
    }
  });

  ws.on('close', () => {
    console.log(`🔌 WebSocket client disconnected`);
    console.log(`   Total clients: ${connectedClients.size - 1}`);
    connectedClients.delete(ws);
  });

  ws.on('error', (error) => {
    console.error('❌ WebSocket client error:', error.message);
  });
});

// HTTP endpoints for status and control
app.get('/', (req, res) => {
  res.json({
    status: 'running',
    name: 'Arduino Serial Bridge',
    version: '1.0.0',
    websocket: `ws://localhost:${WS_PORT}`,
    isMonitoring: isMonitoring,
    endpoints: {
      status: '/status',
      ports: '/ports',
      pause: '/pause',
      resume: '/resume',
    }
  });
});

app.get('/status', (req, res) => {
  res.json({
    serialPort: SERIAL_CONFIG.path,
    baudRate: SERIAL_CONFIG.baudRate,
    isOpen: serialPort ? serialPort.isOpen : false,
    isMonitoring: isMonitoring,
    connectedClients: connectedClients.size,
    timestamp: new Date().toISOString(),
  });
});

app.get('/ports', async (req, res) => {
  try {
    const ports = await SerialPort.list();
    res.json({
      availablePorts: ports,
      currentPort: SERIAL_CONFIG.path,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// HTTP endpoint to pause monitoring
app.post('/pause', (req, res) => {
  isMonitoring = false;
  console.log('⏸️  PAUSED - Server stopped reading serial data (HTTP)');
  broadcastToClients({
    type: 'SYSTEM_STATUS',
    message: 'Server monitoring paused',
    timestamp: new Date().toISOString(),
    isMonitoring: false,
  });
  res.json({ success: true, isMonitoring: false, message: 'Monitoring paused' });
});

// HTTP endpoint to resume monitoring
app.post('/resume', (req, res) => {
  isMonitoring = true;
  console.log('▶️  RESUMED - Server reading serial data (HTTP)');
  broadcastToClients({
    type: 'SYSTEM_STATUS',
    message: 'Server monitoring resumed',
    timestamp: new Date().toISOString(),
    isMonitoring: true,
  });
  res.json({ success: true, isMonitoring: true, message: 'Monitoring resumed' });
});

// Start HTTP server
app.listen(HTTP_PORT, () => {
  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║     Arduino Serial to WebSocket Bridge Server         ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log(`\n📡 WebSocket server: ws://localhost:${WS_PORT}`);
  console.log(`🌐 HTTP server: http://localhost:${HTTP_PORT}`);
  console.log(`\n📊 Endpoints:`);
  console.log(`   - http://localhost:${HTTP_PORT}/status`);
  console.log(`   - http://localhost:${HTTP_PORT}/ports`);
  console.log(`   - http://localhost:${HTTP_PORT}/pause (POST)`);
  console.log(`   - http://localhost:${HTTP_PORT}/resume (POST)`);
  console.log(`\n⚙️  Configuration:`);
  console.log(`   - Serial Port: ${SERIAL_CONFIG.path}`);
  console.log(`   - Baud Rate: ${SERIAL_CONFIG.baudRate}`);
  console.log(`   - Monitoring: ${isMonitoring ? '▶️  ACTIVE' : '⏸️  PAUSED'}`);
  console.log('\n');
});

// Initialize serial connection
initializeSerialPort();

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n🛑 Shutting down server...');
  
  if (serialPort && serialPort.isOpen) {
    serialPort.close();
  }
  
  wss.close(() => {
    console.log('✅ WebSocket server closed');
  });
  
  console.log('✅ Server stopped gracefully\n');
  process.exit(0);
});

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});