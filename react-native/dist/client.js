"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiAppForgeClient = void 0;
const core_1 = require("@ai-appforge/core");
class AiAppForgeClient {
    constructor(options) {
        this.baseUrl = options?.baseUrl || process.env.AI_APP_FORGE_BASE_URL || 'http://localhost:3001';
        // Remove trailing slash from baseUrl if present
        this.baseUrl = this.baseUrl.replace(/\/$/, '');
        this.apiKey = options?.apiKey || process.env.AI_APP_FORGE_API_KEY || '';
        this.authToken = options?.authToken;
        // Initialize modules
        this.workflows = new core_1.WorkflowsModule(this.request.bind(this));
        this.activity = new core_1.ActivityModule(this.request.bind(this));
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
            // Note: React Native's fetch Headers object might behave slightly differently but usually compatible
            throw new core_1.APIError(res.status, data, res.headers);
        }
        return data;
    }
}
exports.AiAppForgeClient = AiAppForgeClient;
