export class ActivityModule {
    constructor(private request: <T>(endpoint: string, options?: any) => Promise<T>) { }

    async list(userId: string) {
        if (!userId) throw new Error('userId is required');
        return this.request<{ success: boolean; data: any[] }>(`/api/activity?userId=${encodeURIComponent(userId)}`, { method: 'GET' });
    }

    async getStats(userId: string) {
        if (!userId) throw new Error('userId is required');
        return this.request<{ success: boolean; data: { stats: any, recentActivity: any[] } }>(`/api/dashboard/stats?userId=${encodeURIComponent(userId)}`, { method: 'GET' });
    }

    async getProjectActivity(projectId: string, options?: { type?: string; userId?: string }) {
        if (!projectId) throw new Error('projectId is required');
        const params = new URLSearchParams();
        if (options?.type) params.append('type', options.type);
        if (options?.userId) params.append('userId', options.userId);

        const query = params.toString();
        const endpoint = `/api/projects/${projectId}/activity-log${query ? `?${query}` : ''}`;

        return this.request<{ success: boolean; data: any[] }>(endpoint, { method: 'GET' });
    }
}
