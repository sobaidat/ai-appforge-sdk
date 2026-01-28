"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiAppForgeSocket = void 0;
const socket_io_client_1 = require("socket.io-client");
class AiAppForgeSocket {
    constructor() {
        this.socket = null;
        this.url = '';
        this.token = null;
        this.apiKey = null;
    }
    /**
     * Connects to the AI App Forge WebSocket server.
     * @param url The base URL of the backend (e.g., http://localhost:3001)
     * @param auth The authentication token (JWT) or API Key
     */
    connect(url, auth) {
        this.url = url;
        const authOptions = {};
        if (auth.startsWith('sk_')) {
            this.apiKey = auth;
            authOptions.apiKey = auth;
        }
        else {
            this.token = auth;
            authOptions.token = auth;
        }
        this.socket = (0, socket_io_client_1.io)(this.url, {
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
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }
    /**
     * Joins a user-specific room.
     * @param userId The ID of the user to join.
     */
    joinUser(userId) {
        if (!this.socket)
            throw new Error('Socket not connected');
        this.socket.emit('join_user', userId);
    }
    /**
     * Joins a workflow-specific room.
     * @param workflowId The ID of the workflow to join.
     */
    joinWorkflow(workflowId) {
        if (!this.socket)
            throw new Error('Socket not connected');
        this.socket.emit('join_workflow', workflowId);
    }
    /**
     * Triggers a workflow run via WebSocket.
     * @param payload The workflow run payload.
     */
    runWorkflow(payload) {
        if (!this.socket)
            throw new Error('Socket not connected');
        this.socket.emit('run_workflow', payload);
    }
    /**
     * Stops a running workflow.
     * @param workflowId The ID of the workflow to stop.
     */
    stopWorkflow(workflowId) {
        if (!this.socket)
            throw new Error('Socket not connected');
        this.socket.emit('stop_workflow', { workflowId });
    }
    /**
     * Listen for workflow execution logs.
     */
    onWorkflowLog(callback) {
        if (!this.socket)
            throw new Error('Socket not connected');
        this.socket.on('workflow_log', callback);
        return () => this.socket?.off('workflow_log', callback);
    }
    /**
     * Listen for node execution results.
     */
    onNodeExecutionResult(callback) {
        if (!this.socket)
            throw new Error('Socket not connected');
        this.socket.on('node_execution_result', callback);
        return () => this.socket?.off('node_execution_result', callback);
    }
    /**
     * Listen for edge status updates (visualization).
     */
    onEdgeStatus(callback) {
        if (!this.socket)
            throw new Error('Socket not connected');
        this.socket.on('edge_status', callback);
        return () => this.socket?.off('edge_status', callback);
    }
    /**
     * Listen for node status updates (pending, running, completed, etc.).
     */
    onNodeStatus(callback) {
        if (!this.socket)
            throw new Error('Socket not connected');
        this.socket.on('node_status', callback);
        return () => this.socket?.off('node_status', callback);
    }
    /**
     * Listen for any event.
     */
    on(event, callback) {
        if (!this.socket)
            throw new Error('Socket not connected');
        this.socket.on(event, callback);
        return () => this.socket?.off(event, callback);
    }
    /**
     * Remove event listener.
     */
    off(event, callback) {
        if (!this.socket)
            return;
        this.socket.off(event, callback);
    }
    /**
     * Generic event listener exposing the underlying socket.
     */
    getRawSocket() {
        return this.socket;
    }
}
exports.AiAppForgeSocket = AiAppForgeSocket;
