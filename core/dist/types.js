"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = void 0;
class APIError extends Error {
    constructor(status, body, headers) {
        super(body?.error || `API request failed with status ${status}`);
        this.status = status;
        this.body = body;
        this.headers = headers;
    }
}
exports.APIError = APIError;
