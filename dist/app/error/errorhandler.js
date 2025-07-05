"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (message, success, error) => {
    return {
        message: message,
        success: success,
        error: error,
    };
};
exports.errorHandler = errorHandler;
