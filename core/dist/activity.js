"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityModule = void 0;
class ActivityModule {
    constructor(request) {
        this.request = request;
    }
    async list(userId) {
        if (!userId)
            throw new Error('userId is required');
        return this.request(`/api/activity?userId=${encodeURIComponent(userId)}`, { method: 'GET' });
    }
    async getStats(userId) {
        if (!userId)
            throw new Error('userId is required');
        return this.request(`/api/dashboard/stats?userId=${encodeURIComponent(userId)}`, { method: 'GET' });
    }
    async getProjectActivity(projectId, options) {
        if (!projectId)
            throw new Error('projectId is required');
        const params = new URLSearchParams();
        if (options?.type)
            params.append('type', options.type);
        if (options?.userId)
            params.append('userId', options.userId);
        const query = params.toString();
        const endpoint = `/api/projects/${projectId}/activity-log${query ? `?${query}` : ''}`;
        return this.request(endpoint, { method: 'GET' });
    }
}
exports.ActivityModule = ActivityModule;
