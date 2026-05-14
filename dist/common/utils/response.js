"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = void 0;
const successResponse = (data, message = "Success") => {
    return {
        success: true,
        message,
        data,
    };
};
exports.successResponse = successResponse;
//# sourceMappingURL=response.js.map