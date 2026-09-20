export interface CategoryObjectType {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    /** Only returned by the list endpoint. */
    productCount?: number;
    createdAt: string;
    updatedAt: string;
}

export interface CategoryFieldsType {
    name: string;
    description?: string;
}
