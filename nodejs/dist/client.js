import fetch from 'node-fetch';
import { WorkflowsModule, APIError } from '@ai-appforge/core';
import * as dotenv from 'dotenv';
// Load environment variables
dotenv.config();
export class AiAppForgeClient {
    constructor(options) {
        this.baseUrl = process.env.AI_APP_FORGE_BASE_URL || 'http://localhost:3001';
        // Remove trailing slash from baseUrl if present
        this.baseUrl = this.baseUrl.replace(/\/$/, '');
        this.apiKey = options?.apiKey || process.env.AI_APP_FORGE_API_KEY || '';
        // Initialize modules
        this.workflows = new WorkflowsModule(this.request.bind(this));
    }
    async request(endpoint, options) {
        const headers = {
            'Content-Type': 'application/json',
            ...(options?.headers || {}),
        };
        if (this.apiKey) {
            headers['x-api-key'] = this.apiKey;
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
