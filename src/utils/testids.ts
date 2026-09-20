export const addTestIds = <F extends object, T>(
    obj: F,
    testids: T
): F & { testids: T } => {
    return Object.assign(obj, { testids });
};
