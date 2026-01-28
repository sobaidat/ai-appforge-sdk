import { Workflow } from './index';

describe('Core SDK', () => {
    it('should export types', () => {
        expect(true).toBe(true);
        // Basic smoke test to ensure types are resolvable
        const workflow: Partial<Workflow> = {
            id: 'test-id',
            name: 'Test Workflow'
        };
        expect(workflow.id).toBe('test-id');
    });
});
