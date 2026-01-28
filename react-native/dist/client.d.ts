import { WorkflowsModule } from '@ai-appforge/core';
export declare class AiAppForgeClient {
    private baseUrl;
    private apiKey;
    workflows: WorkflowsModule;
    constructor(options: {
        apiKey: string;
    });
    private request;
}
