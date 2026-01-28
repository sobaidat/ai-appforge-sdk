export declare class ActivityModule {
    private request;
    constructor(request: <T>(endpoint: string, options?: any) => Promise<T>);
    list(userId: string): Promise<{
        success: boolean;
        data: any[];
    }>;
    getStats(userId: string): Promise<{
        success: boolean;
        data: {
            stats: any;
            recentActivity: any[];
        };
    }>;
    getProjectActivity(projectId: string, options?: {
        type?: string;
        userId?: string;
    }): Promise<{
        success: boolean;
        data: any[];
    }>;
}
