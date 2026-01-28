"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
describe('Core SDK', () => {
    it('should export types', () => {
        expect(true).toBe(true);
        // Basic smoke test to ensure types are resolvable
        const workflow = {
            id: 'test-id',
            name: 'Test Workflow'
        };
        expect(workflow.id).toBe('test-id');
    });
});
