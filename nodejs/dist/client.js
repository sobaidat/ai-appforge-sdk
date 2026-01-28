import fetch from 'node-fetch';
import { WorkflowsModule, APIError, ActivityModule } from '@ai-appforge/core';
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
        this.workflows = new WorkflowsModule(this.request.bind(this));
        this.activity = new ActivityModule(this.request.bind(this));
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
