import { WorkflowsModule, ActivityModule } from '@ai-appforge/core';
export declare class AiAppForgeClient {
    private baseUrl;
    private apiKey;
    private authToken?;
    workflows: WorkflowsModule;
    activity: ActivityModule;
    constructor(options?: {
        apiKey?: string;
        baseUrl?: string;
        authToken?: string;
    });
    private request;
}
