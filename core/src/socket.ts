import { io, Socket } from 'socket.io-client';

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
    workflow?: any; // WorkflowDefinition
    input?: any;
}

export type SocketEvent = 'workflow_log' | 'node_execution_result' | 'edge_status' | 'node_status';

export class AiAppForgeSocket {
    private socket: Socket | null = null;
    private url: string = '';
    private token: string | null = null;
    private apiKey: string | null = null;

    /**
     * Connects to the AI App Forge WebSocket server.
     * @param url The base URL of the backend (e.g., http://localhost:3001)
     * @param auth The authentication token (JWT) or API Key
     */
    public connect(url: string, auth: string): Socket {
        this.url = url;

        const authOptions: any = {};
        if (auth.startsWith('sk_')) {
            this.apiKey = auth;
            authOptions.apiKey = auth;
        } else {
            this.token = auth;
            authOptions.token = auth;
        }

        this.socket = io(this.url, {
            auth: authOptions,
            transports: ['websocket'],
            autoConnect: true,
            reconnection: true,
        });

        this.socket.on('connect', () => {
            console.log(`[AiAppForgeSocket] Connected to ${this.url}`);
        });

        this.socket.on('connect_error', (err) => {
            console.error(`[AiAppForgeSocket] Connection error:`, err.message);
        });

        this.socket.on('disconnect', (reason) => {
            console.log(`[AiAppForgeSocket] Disconnected: ${reason}`);
        });

        return this.socket;
    }

    /**
     * Disconnects the socket.
     */
    public disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    /**
     * Joins a user-specific room.
     * @param userId The ID of the user to join.
     */
    public joinUser(userId: string) {
        if (!this.socket) throw new Error('Socket not connected');
        this.socket.emit('join_user', userId);
    }

    /**
     * Joins a workflow-specific room.
     * @param workflowId The ID of the workflow to join.
     */
    public joinWorkflow(workflowId: string) {
        if (!this.socket) throw new Error('Socket not connected');
        this.socket.emit('join_workflow', workflowId);
    }

    /**
     * Triggers a workflow run via WebSocket.
     * @param payload The workflow run payload.
     */
    public runWorkflow(payload: RunWorkflowPayload) {
        if (!this.socket) throw new Error('Socket not connected');
        this.socket.emit('run_workflow', payload);
    }

    /**
     * Stops a running workflow.
     * @param workflowId The ID of the workflow to stop.
     */
    public stopWorkflow(workflowId: string) {
        if (!this.socket) throw new Error('Socket not connected');
        this.socket.emit('stop_workflow', { workflowId });
    }

    /**
     * Listen for workflow execution logs.
     */
    public onWorkflowLog(callback: (log: WorkflowLog) => void) {
        if (!this.socket) throw new Error('Socket not connected');
        this.socket.on('workflow_log', callback);
        return () => this.socket?.off('workflow_log', callback);
    }

    /**
     * Listen for node execution results.
     */
    public onNodeExecutionResult(callback: (result: NodeExecutionResult) => void) {
        if (!this.socket) throw new Error('Socket not connected');
        this.socket.on('node_execution_result', callback);
        return () => this.socket?.off('node_execution_result', callback);
    }

    /**
     * Listen for edge status updates (visualization).
     */
    public onEdgeStatus(callback: (status: EdgeStatus) => void) {
        if (!this.socket) throw new Error('Socket not connected');
        this.socket.on('edge_status', callback);
        return () => this.socket?.off('edge_status', callback);
    }

    /**
     * Listen for node status updates (pending, running, completed, etc.).
     */
    public onNodeStatus(callback: (status: NodeStatus) => void) {
        if (!this.socket) throw new Error('Socket not connected');
        this.socket.on('node_status', callback);
        return () => this.socket?.off('node_status', callback);
    }

    /**
     * Listen for any event.
     */
    public on(event: string, callback: (...args: any[]) => void) {
        if (!this.socket) throw new Error('Socket not connected');
        this.socket.on(event, callback);
        return () => this.socket?.off(event, callback);
    }

    /**
     * Remove event listener.
     */
    public off(event: string, callback: (...args: any[]) => void) {
        if (!this.socket) return;
        this.socket.off(event, callback);
    }

    /**
     * Generic event listener exposing the underlying socket.
     */
    public getRawSocket(): Socket | null {
        return this.socket;
    }
}
