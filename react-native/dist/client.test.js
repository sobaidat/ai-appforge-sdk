"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
describe('WorkflowSDK React Native', () => {
    it('should be instantiable', () => {
        // Just a smoke test
        const client = new client_1.AiAppForgeClient({ apiKey: 'test-key' });
        expect(client).toBeDefined();
    });
});
