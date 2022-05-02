import {Category, Home, Inventory, Login, Person} from "@mui/icons-material";
import React, {lazy} from "react";
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {SvgIconTypeMap} from "@mui/material";

export interface Route {
    path: string,
    Component: React.LazyExoticComponent<() => JSX.Element>,
    permissionRequired?: object,
    name: string,
    Icon:  OverridableComponent<SvgIconTypeMap<{}, "svg">> & {muiName: string}
}

export interface RouteAuth {
    path: string,
    // Component: React.LazyExoticComponent<() => JSX.Element>,
    permissionRequired?: object,
    name: string,
    Icon:  OverridableComponent<SvgIconTypeMap<{}, "svg">> & {muiName: string}
}

const authRoutes: RouteAuth[]  = [
    {
        path: '/login',
        name: 'Entrar',
        Icon: Login
    },
    {
        path: '/logout',
        name: 'Salir',
        Icon: Login
    },
]
const dashboardRoutes: Route[] = [
    {
        path: '/',
        name: 'Dashboard',
        Icon: Home,
        Component:  lazy(() => import('../pages/Dashboard/DashboardPage'))
    },

    {
        path: '/products',
        name: 'Productos',
        Icon: Inventory,
        Component: lazy(() => import('../pages/Product/ProductPage'))

    },
    {
        path: '/categories',
        name: 'Categorias',
        Icon: Category,
        Component: lazy(() => import('../pages/Category/CategoryPage'))
    },
    {
        path: '/clients',
        name: 'Clientes',
        Icon: Person,
        Component: lazy(() => import('../pages/Clients/ClientPage'))
    }
]


const routes = {
    dashboardRoutes,
    authRoutes
}

export default routes
