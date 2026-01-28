import { AiAppForgeClient } from './client.js';

describe('WorkflowSDK Node.js', () => {
    it('should be instantiable', () => {
        const client = new AiAppForgeClient({ apiKey: 'test-key' });
        expect(client).toBeDefined();
    });

    it('should accept optional apiKey', () => {
        const client = new AiAppForgeClient();
        expect(client).toBeDefined();
    });

    // Add more meaningful tests as needed
});
