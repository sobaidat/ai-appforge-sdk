import { AiAppForgeClient } from './src/client';
import * as dotenv from 'dotenv';
dotenv.config();

const client = new AiAppForgeClient({
    baseUrl: 'http://localhost:3001',
    apiKey: 'sk_test_key'
});

console.log('Checking client.socket instance...');
if (client.socket) {
    console.log('✅ client.socket exists');
} else {
    console.error('❌ client.socket missing');
    process.exit(1);
}

// Test 1: Direct Socket Usage using generic .on()
console.log('\n--- Test 1: Direct Socket Usage ---');
try {
    client.connectSocket();
    console.log('✅ connectSocket() called');

    // This requires the new .on() method on AiAppForgeSocket
    client.socket.on('connect', () => {
        console.log('✅ [Direct] Socket connected event received');
    });
} catch (e: any) {
    console.error('❌ Direct socket usage failed:', e.message);
}

// Test 2: Workflow Module Integration
console.log('\n--- Test 2: Workflows Module Integration ---');
try {
    // Check if methods exist
    if (typeof client.workflows.join === 'function') {
        console.log('✅ client.workflows.join exists');
    } else {
        console.error('❌ client.workflows.join MISSING');
    }

    if (typeof client.workflows.onLog === 'function') {
        console.log('✅ client.workflows.onLog exists');
    } else {
        console.error('❌ client.workflows.onLog MISSING');
    }

    // Simulate usage
    client.workflows.join('test-workflow-id');
    console.log('✅ client.workflows.join called');

    const unsubscribe = client.workflows.onLog((log) => {
        console.log('Received log:', log);
    });
    console.log('✅ client.workflows.onLog subscribed');

    if (unsubscribe) unsubscribe();

} catch (e: any) {
    console.error('❌ Workflow module integration failed:', e.message);
    process.exit(1);
}

console.log('\nWaiting for events...');
setTimeout(() => {
    console.log('Done.');
    process.exit(0);
}, 3000);
