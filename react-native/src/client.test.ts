import { AiAppForgeClient } from './client';

describe('WorkflowSDK React Native', () => {
    it('should be instantiable', () => {
        // Just a smoke test
        const client = new AiAppForgeClient({ apiKey: 'test-key' });
        expect(client).toBeDefined();
    });
});
