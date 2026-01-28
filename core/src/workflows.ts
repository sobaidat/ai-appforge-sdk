import {
    Workflow,
    ListWorkflowsResponse,
    RunWorkflowInput,
    RunWorkflowResponse,
    StopWorkflowResponse,
    SaveWorkflowInput,
    SaveWorkflowResponse,
    ListReusableWorkflowsResponse,
    ListSchedulesResponse,
    CancelScheduleResponse,
    GetWaitingInputsResponse,
    RespondToInputData,
    RespondToInputResponse,
    DeleteWorkflowResponse
} from './types'; // Removed .js extension for TS resolution

export class WorkflowsModule {
    constructor(private request: <T>(endpoint: string, options?: any) => Promise<T>) { }

    /**
     * List all workflows for a user.
     * @param userId The ID of the user.
     */
    async list(userId: string): Promise<ListWorkflowsResponse> {
        if (!userId) throw new Error('userId is required');
        return this.request<ListWorkflowsResponse>(
            `/api/workflows?userId=${encodeURIComponent(userId)}`,
            { method: 'GET' }
        );
    }

    /**
     * Get a specific workflow by ID.
     * @param id The workflow ID.
     */
    async get(id: string): Promise<Workflow> {
        if (!id) throw new Error('id is required');
        const res = await this.request<{ success: boolean; data: Workflow }>(
            `/api/workflows/${id}`,
            { method: 'GET' }
        );
        return res.data;
    }

    /**
     * Run a workflow.
     * @param data The input data for running the workflow.
     */
    async run(data: RunWorkflowInput): Promise<RunWorkflowResponse> {
        return this.request<RunWorkflowResponse>(
            '/api/workflows/run',
            {
                method: 'POST',
                body: JSON.stringify(data)
            }
        );
    }

    /**
     * Stop a running workflow.
     * @param workflowId The ID of the workflow to stop.
     */
    async stop(workflowId: string): Promise<StopWorkflowResponse> {
        if (!workflowId) throw new Error('workflowId is required');
        return this.request<StopWorkflowResponse>(
            '/api/workflows/stop',
            {
                method: 'POST',
                body: JSON.stringify({ workflowId })
            }
        );
    }

    /**
     * Save (create or update) a workflow.
     * @param data The workflow data to save.
     */
    async save(data: SaveWorkflowInput): Promise<SaveWorkflowResponse> {
        return this.request<SaveWorkflowResponse>(
            '/api/workflows/save',
            {
                method: 'POST',
                body: JSON.stringify(data)
            }
        );
    }

    /**
     * Delete a workflow by ID.
     * @param id The ID of the workflow to delete.
     */
    async delete(id: string): Promise<DeleteWorkflowResponse> {
        if (!id) throw new Error('id is required');
        return this.request<DeleteWorkflowResponse>(
            `/api/workflows/${id}`,
            { method: 'DELETE' }
        );
    }

    /**
     * List reusable workflows for a user.
     * @param userId The ID of the user.
     */
    async listReusable(userId: string): Promise<ListReusableWorkflowsResponse> {
        if (!userId) throw new Error('userId is required');
        return this.request<ListReusableWorkflowsResponse>(
            `/api/workflows/reusable?userId=${encodeURIComponent(userId)}`,
            { method: 'GET' }
        );
    }

    /**
     * List scheduled jobs/workflows.
     * @param userId The ID of the user.
     * @param workflowId Optional workflow ID filter.
     * @param status Optional status filter.
     */
    async listSchedules(userId: string, workflowId?: string, status?: string): Promise<ListSchedulesResponse> {
        if (!userId) throw new Error('userId is required');
        let query = `?userId=${encodeURIComponent(userId)}`;
        if (workflowId) query += `&workflowId=${encodeURIComponent(workflowId)}`;
        if (status) query += `&status=${encodeURIComponent(status)}`;

        return this.request<ListSchedulesResponse>(
            `/api/schedules${query}`,
            { method: 'GET' }
        );
    }

    /**
     * Cancel a scheduled job.
     * @param jobId The ID of the job/schedule to cancel.
     */
    async cancelSchedule(jobId: string): Promise<CancelScheduleResponse> {
        if (!jobId) throw new Error('jobId is required');
        return this.request<CancelScheduleResponse>(
            '/api/schedules/cancel',
            {
                method: 'POST',
                body: JSON.stringify({ jobId })
            }
        );
    }

    /**
     * Get inputs waiting for user response.
     * @param userId The ID of the user.
     * @param status Optional status filter.
     */
    async getWaitingInputs(userId: string, status?: string): Promise<GetWaitingInputsResponse> {
        if (!userId) throw new Error('userId is required');
        let query = `?userId=${encodeURIComponent(userId)}`;
        if (status) query += `&status=${encodeURIComponent(status)}`;

        return this.request<GetWaitingInputsResponse>(
            `/api/workflows/inputs${query}`,
            { method: 'GET' }
        );
    }

    /**
     * Respond to a waiting input.
     * @param data The response data including inputId.
     */
    async respondToInput(data: RespondToInputData): Promise<RespondToInputResponse> {
        return this.request<RespondToInputResponse>(
            '/api/workflows/inputs/respond',
            {
                method: 'POST',
                body: JSON.stringify(data)
            }
        );
    }
}
