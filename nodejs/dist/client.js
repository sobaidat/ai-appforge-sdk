import fetch from 'node-fetch';
import { WorkflowsModule, APIError, ActivityModule, AiAppForgeSocket } from '@ai-appforge/core';
import * as dotenv from 'dotenv';
// Load environment variables
dotenv.config();
export class AiAppForgeClient {
    constructor(options) {
        this.baseUrl = options?.baseUrl || process.env.AI_APP_FORGE_BASE_URL || 'http://localhost:3001';
        // Remove trailing slash from baseUrl if present
        this.baseUrl = this.baseUrl.replace(/\/$/, '');
        this.apiKey = options?.apiKey || process.env.AI_APP_FORGE_API_KEY || '';
        this.authToken = options?.authToken;
        // Initialize modules
        this.socket = new AiAppForgeSocket();
        this.workflows = new WorkflowsModule(this.request.bind(this), this.socket);
        this.activity = new ActivityModule(this.request.bind(this));
    }
    /**
     * Connects the WebSocket client using the SDK's configuration.
     */
    connectSocket() {
        const auth = this.apiKey || this.authToken || '';
        this.socket.connect(this.baseUrl, auth);
    }
    async request(endpoint, options) {
        const headers = {
            'Content-Type': 'application/json',
            ...(options?.headers || {}),
        };
        if (this.apiKey) {
            headers['x-api-key'] = this.apiKey;
        }
        if (this.authToken) {
            headers['Authorization'] = `Bearer ${this.authToken}`;
        }
        const res = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers,
        });
        let data;
        try {
            data = await res.json();
        }
        catch {
            data = {};
        }
        if (!res.ok) {
            throw new APIError(res.status, data, res.headers);
        }
        return data;
    }
}
