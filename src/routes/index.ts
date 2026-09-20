import { ReactNode } from 'react';
import { pathWithId } from 'utils/routes';

export interface routeShape {
    path: string;
    icon?: ReactNode;
    title: string;
    keywords?: string;
    description?: string;
}

export class Route {
    id: symbol;

    path: string;

    icon: ReactNode;

    title: string;

    description: string;

    keywords: string;

    constructor({
        path = '',
        icon = null,
        title = '',
        description = '',
        keywords = '',
    }: routeShape) {
        this.id = Symbol(path);
        this.path = path;
        this.icon = icon;
        this.title = title;
        this.description = description;
        this.keywords = keywords;
    }

    pathWithId(id: string | number) {
        return pathWithId(this.path, id);
    }

    toString() {
        return this.path;
    }
}

const routes = {
    notFound404: new Route({
        path: '/not-found',
        icon: null,
        title: 'Not found',
    }),
    home: new Route({
        path: '/',
        icon: null,
        title: 'Home',
    }),
    login: new Route({
        path: '/login',
        icon: null,
        title: 'Sign in',
    }),
    admin: new Route({
        path: '/admin',
        icon: null,
        title: 'Dashboard',
    }),
    adminProducts: new Route({
        path: '/admin/products',
        icon: null,
        title: 'Products',
    }),
    adminProductNew: new Route({
        path: '/admin/products/new',
        icon: null,
        title: 'New product',
    }),
    adminProductEdit: new Route({
        path: '/admin/products/:id',
        icon: null,
        title: 'Edit product',
    }),
    adminCategories: new Route({
        path: '/admin/categories',
        icon: null,
        title: 'Categories',
    }),
    adminStock: new Route({
        path: '/admin/stock',
        icon: null,
        title: 'Stock',
    }),
};

export default routes;
