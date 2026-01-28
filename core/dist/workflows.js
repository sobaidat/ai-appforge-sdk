"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowsModule = void 0;
class WorkflowsModule {
    constructor(request) {
        this.request = request;
    }
    /**
     * List all workflows for a user.
     * @param userId The ID of the user.
     */
    async list(userId) {
        if (!userId)
            throw new Error('userId is required');
        return this.request(`/api/workflows?userId=${encodeURIComponent(userId)}`, { method: 'GET' });
    }
    /**
     * Get a specific workflow by ID.
     * @param id The workflow ID.
     */
    async get(id) {
        if (!id)
            throw new Error('id is required');
        const res = await this.request(`/api/workflows/${id}`, { method: 'GET' });
        return res.data;
    }
    /**
     * Run a workflow.
     * @param data The input data for running the workflow.
     */
    async run(data) {
        return this.request('/api/workflows/run', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
    /**
     * Stop a running workflow.
     * @param workflowId The ID of the workflow to stop.
     */
    async stop(workflowId) {
        if (!workflowId)
            throw new Error('workflowId is required');
        return this.request('/api/workflows/stop', {
            method: 'POST',
            body: JSON.stringify({ workflowId })
        });
    }
    /**
     * Save (create or update) a workflow.
     * @param data The workflow data to save.
     */
    async save(data) {
        return this.request('/api/workflows/save', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
    /**
     * Delete a workflow by ID.
     * @param id The ID of the workflow to delete.
     */
    async delete(id) {
        if (!id)
            throw new Error('id is required');
        return this.request(`/api/workflows/${id}`, { method: 'DELETE' });
    }
    /**
     * List reusable workflows for a user.
     * @param userId The ID of the user.
     */
    async listReusable(userId) {
        if (!userId)
            throw new Error('userId is required');
        return this.request(`/api/workflows/reusable?userId=${encodeURIComponent(userId)}`, { method: 'GET' });
    }
    /**
     * List scheduled jobs/workflows.
     * @param userId The ID of the user.
     * @param workflowId Optional workflow ID filter.
     * @param status Optional status filter.
     */
    async listSchedules(userId, workflowId, status) {
        if (!userId)
            throw new Error('userId is required');
        let query = `?userId=${encodeURIComponent(userId)}`;
        if (workflowId)
            query += `&workflowId=${encodeURIComponent(workflowId)}`;
        if (status)
            query += `&status=${encodeURIComponent(status)}`;
        return this.request(`/api/schedules${query}`, { method: 'GET' });
    }
    /**
     * Cancel a scheduled job.
     * @param jobId The ID of the job/schedule to cancel.
     */
    async cancelSchedule(jobId) {
        if (!jobId)
            throw new Error('jobId is required');
        return this.request('/api/schedules/cancel', {
            method: 'POST',
            body: JSON.stringify({ jobId })
        });
    }
    /**
     * Get inputs waiting for user response.
     * @param userId The ID of the user.
     * @param status Optional status filter.
     */
    async getWaitingInputs(userId, status) {
        if (!userId)
            throw new Error('userId is required');
        let query = `?userId=${encodeURIComponent(userId)}`;
        if (status)
            query += `&status=${encodeURIComponent(status)}`;
        return this.request(`/api/workflows/inputs${query}`, { method: 'GET' });
    }
    /**
     * Respond to a waiting input.
     * @param data The response data including inputId.
     */
    async respondToInput(data) {
        return this.request('/api/workflows/inputs/respond', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
}
exports.WorkflowsModule = WorkflowsModule;
