import { AiAppForgeSocket } from './src/socket';

const url = process.env.BACKEND_URL || 'http://localhost:3001';
const key = process.env.API_KEY || 'sk_test_key';

console.log(`Connecting to ${url} with key ${key}...`);

const socketClient = new AiAppForgeSocket();
const socket = socketClient.connect(url, key);

socket.on('connect', () => {
    console.log('Successfully connected!');
    // Test joining a room
    try {
        socketClient.joinWorkflow('test-workflow-id');
        console.log('Joined workflow room request sent');
    } catch (e) {
        console.error('Error joining room:', e);
    }
});

socket.on('connect_error', (err) => {
    console.error('Connection error details:', err.message);
});

socketClient.onWorkflowLog((log) => {
    console.log('Received Workflow Log:', log);
});

// Cleanup after 10 seconds
setTimeout(() => {
    console.log('Test finished. Disconnecting...');
    socketClient.disconnect();
    process.exit(0);
}, 10000);
