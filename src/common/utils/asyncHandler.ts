export const asyncHandler =
  (fn: Function) =>
  (...args: any[]) =>
    Promise.resolve(fn(...args)).catch(args[2]);
