import { Socket } from 'socket.io-client';
export interface WorkflowLog {
    type: 'info' | 'success' | 'warn' | 'error' | 'debug';
    message: string;
    timestamp: string;
    workflowId?: string;
}
export interface NodeExecutionResult {
    nodeId: string;
    result: any;
    timestamp: string;
    workflowId?: string;
}
export interface EdgeStatus {
    from: string;
    to: string;
    status: 'active' | 'inactive';
    timestamp: string;
    workflowId?: string;
}
export interface NodeStatus {
    nodeId: string;
    status: 'pending' | 'running' | 'completed' | 'failed' | 'suspended';
    timestamp: string;
    workflowId?: string;
}
export interface RunWorkflowPayload {
    workflowId?: string;
    workflow?: any;
    input?: any;
}
export type SocketEvent = 'workflow_log' | 'node_execution_result' | 'edge_status' | 'node_status';
export declare class AiAppForgeSocket {
    private socket;
    private url;
    private token;
    private apiKey;
    /**
     * Connects to the AI App Forge WebSocket server.
     * @param url The base URL of the backend (e.g., http://localhost:3001)
     * @param auth The authentication token (JWT) or API Key
     */
    connect(url: string, auth: string): Socket;
    /**
     * Disconnects the socket.
     */
    disconnect(): void;
    /**
     * Joins a user-specific room.
     * @param userId The ID of the user to join.
     */
    joinUser(userId: string): void;
    /**
     * Joins a workflow-specific room.
     * @param workflowId The ID of the workflow to join.
     */
    joinWorkflow(workflowId: string): void;
    /**
     * Triggers a workflow run via WebSocket.
     * @param payload The workflow run payload.
     */
    runWorkflow(payload: RunWorkflowPayload): void;
    /**
     * Stops a running workflow.
     * @param workflowId The ID of the workflow to stop.
     */
    stopWorkflow(workflowId: string): void;
    /**
     * Listen for workflow execution logs.
     */
    onWorkflowLog(callback: (log: WorkflowLog) => void): () => Socket<import("@socket.io/component-emitter").DefaultEventsMap, import("@socket.io/component-emitter").DefaultEventsMap> | undefined;
    /**
     * Listen for node execution results.
     */
    onNodeExecutionResult(callback: (result: NodeExecutionResult) => void): () => Socket<import("@socket.io/component-emitter").DefaultEventsMap, import("@socket.io/component-emitter").DefaultEventsMap> | undefined;
    /**
     * Listen for edge status updates (visualization).
     */
    onEdgeStatus(callback: (status: EdgeStatus) => void): () => Socket<import("@socket.io/component-emitter").DefaultEventsMap, import("@socket.io/component-emitter").DefaultEventsMap> | undefined;
    /**
     * Listen for node status updates (pending, running, completed, etc.).
     */
    onNodeStatus(callback: (status: NodeStatus) => void): () => Socket<import("@socket.io/component-emitter").DefaultEventsMap, import("@socket.io/component-emitter").DefaultEventsMap> | undefined;
    /**
     * Listen for any event.
     */
    on(event: string, callback: (...args: any[]) => void): () => Socket<import("@socket.io/component-emitter").DefaultEventsMap, import("@socket.io/component-emitter").DefaultEventsMap> | undefined;
    /**
     * Remove event listener.
     */
    off(event: string, callback: (...args: any[]) => void): void;
    /**
     * Generic event listener exposing the underlying socket.
     */
    getRawSocket(): Socket | null;
}
