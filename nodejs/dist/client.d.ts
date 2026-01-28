import { WorkflowsModule, ActivityModule, AiAppForgeSocket } from '@ai-appforge/core';
export declare class AiAppForgeClient {
    private baseUrl;
    private apiKey;
    private authToken?;
    workflows: WorkflowsModule;
    activity: ActivityModule;
    socket: AiAppForgeSocket;
    constructor(options?: {
        apiKey?: string;
        baseUrl?: string;
        authToken?: string;
    });
    /**
     * Connects the WebSocket client using the SDK's configuration.
     */
    connectSocket(): void;
    private request;
}
