import { Workflow, ListWorkflowsResponse, RunWorkflowInput, RunWorkflowResponse, StopWorkflowResponse, SaveWorkflowInput, SaveWorkflowResponse, ListReusableWorkflowsResponse, ListSchedulesResponse, CancelScheduleResponse, GetWaitingInputsResponse, RespondToInputData, RespondToInputResponse, DeleteWorkflowResponse } from './types';
export declare class WorkflowsModule {
    private request;
    constructor(request: <T>(endpoint: string, options?: any) => Promise<T>);
    /**
     * List all workflows for a user.
     * @param userId The ID of the user.
     */
    list(userId: string): Promise<ListWorkflowsResponse>;
    /**
     * Get a specific workflow by ID.
     * @param id The workflow ID.
     */
    get(id: string): Promise<Workflow>;
    /**
     * Run a workflow.
     * @param data The input data for running the workflow.
     */
    run(data: RunWorkflowInput): Promise<RunWorkflowResponse>;
    /**
     * Stop a running workflow.
     * @param workflowId The ID of the workflow to stop.
     */
    stop(workflowId: string): Promise<StopWorkflowResponse>;
    /**
     * Save (create or update) a workflow.
     * @param data The workflow data to save.
     */
    save(data: SaveWorkflowInput): Promise<SaveWorkflowResponse>;
    /**
     * Delete a workflow by ID.
     * @param id The ID of the workflow to delete.
     */
    delete(id: string): Promise<DeleteWorkflowResponse>;
    /**
     * List reusable workflows for a user.
     * @param userId The ID of the user.
     */
    listReusable(userId: string): Promise<ListReusableWorkflowsResponse>;
    /**
     * List scheduled jobs/workflows.
     * @param userId The ID of the user.
     * @param workflowId Optional workflow ID filter.
     * @param status Optional status filter.
     */
    listSchedules(userId: string, workflowId?: string, status?: string): Promise<ListSchedulesResponse>;
    /**
     * Cancel a scheduled job.
     * @param jobId The ID of the job/schedule to cancel.
     */
    cancelSchedule(jobId: string): Promise<CancelScheduleResponse>;
    /**
     * Get inputs waiting for user response.
     * @param userId The ID of the user.
     * @param status Optional status filter.
     */
    getWaitingInputs(userId: string, status?: string): Promise<GetWaitingInputsResponse>;
    /**
     * Respond to a waiting input.
     * @param data The response data including inputId.
     */
    respondToInput(data: RespondToInputData): Promise<RespondToInputResponse>;
}
