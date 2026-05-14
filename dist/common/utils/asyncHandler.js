"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
const asyncHandler = (fn) => (...args) => Promise.resolve(fn(...args)).catch(args[2]);
exports.asyncHandler = asyncHandler;
//# sourceMappingURL=asyncHandler.js.map