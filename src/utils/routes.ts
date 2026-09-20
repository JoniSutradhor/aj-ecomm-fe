export const pathWithId = (path: string, id: number | string, param = 'id') => {
    return path.replace(`:${param}`, String(id));
};
