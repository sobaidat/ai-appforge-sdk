import { Headers as FetchHeaders } from 'node-fetch';
export interface Workflow {
    id: string;
    name: string;
    description?: string;
    userId: string;
    isReusable?: boolean;
    icon?: any;
    workflow_data?: {
        nodes: any[];
        edges: any[];
        viewport?: any;
        isReusable?: boolean;
        icon?: any;
        description?: string;
    };
    created_at?: string;
    updated_at?: string;
}
export interface ListWorkflowsResponse {
    success: boolean;
    data: Workflow[];
}
export interface RunWorkflowInput {
    workflow?: {
        nodes: any[];
        edges: any[];
        [key: string]: any;
    };
    workflowId?: string;
    userId?: string;
    input?: any;
    [key: string]: any;
}
export interface RunWorkflowResponse {
    success: boolean;
    context?: any;
    logs?: any[];
    job?: any;
    scheduled?: boolean;
    error?: string;
}
export interface StopWorkflowResponse {
    success: boolean;
    message: string;
    error?: string;
}
export interface SaveWorkflowInput {
    nodes: any[];
    edges: any[];
    name?: string;
    userId: string;
    workflowId?: string;
    viewport?: any;
    isReusable?: boolean;
    icon?: any;
    description?: string;
}
export interface SaveWorkflowResponse {
    success: boolean;
    data?: any;
    message?: string;
    error?: string;
}
export interface ListReusableWorkflowsResponse {
    success: boolean;
    data: any[];
    error?: string;
}
export interface ListSchedulesResponse {
    success: boolean;
    data: any[];
    error?: string;
}
export interface CancelScheduleResponse {
    success: boolean;
    message?: string;
    error?: string;
}
export interface WaitingInput {
    id: string;
    workflow_id: string;
    node_id: string;
    user_id: string;
    status: 'waiting' | 'responded';
    context: any;
    created_at: string;
    [key: string]: any;
}
export interface GetWaitingInputsResponse {
    success: boolean;
    data: WaitingInput[];
    error?: string;
}
export interface RespondToInputData {
    inputId: string;
    responseData: any;
}
export interface RespondToInputResponse {
    success: boolean;
    message?: string;
    error?: string;
}
export interface DeleteWorkflowResponse {
    success: boolean;
    message?: string;
    error?: string;
}
export declare class APIError extends Error {
    status: number;
    body: any;
    headers: FetchHeaders;
    constructor(status: number, body: any, headers: FetchHeaders);
}
