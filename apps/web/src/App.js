import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { roleSchema } from '@rigways/types';
import { NavLink, Route, Routes } from 'react-router-dom';
const navItems = [
    { label: 'Dashboard', path: '/', roles: roleSchema.options },
    { label: 'Users', path: '/users', roles: ['admin', 'manager'] },
    { label: 'Clients', path: '/clients', roles: ['admin', 'manager'] },
    { label: 'Locations', path: '/functional-locations', roles: roleSchema.options },
    { label: 'Inspectors', path: '/inspectors', roles: ['admin', 'manager', 'technician'] },
    { label: 'Assets', path: '/assets', roles: roleSchema.options },
    { label: 'Certificates', path: '/certificates', roles: roleSchema.options },
    { label: 'Jobs', path: '/jobs', roles: roleSchema.options },
    { label: 'Notifications', path: '/notifications', roles: roleSchema.options },
    { label: 'Reports', path: '/reports', roles: ['admin', 'manager'] },
];
const currentRole = 'admin';
function Shell({ children }) {
    const visibleNav = navItems.filter((item) => item.roles.includes(currentRole));
    return (_jsxs("div", { className: "app-shell", children: [_jsxs("aside", { className: "sidebar", children: [_jsxs("div", { className: "brand-block", children: [_jsx("strong", { children: "Rigways ACM" }), _jsx("span", { children: "Next-gen rebuild" })] }), _jsx("nav", { className: "sidebar-nav", children: visibleNav.map((item) => (_jsx(NavLink, { to: item.path, end: item.path === '/', className: "nav-link", children: item.label }, item.path))) })] }), _jsxs("div", { className: "main-shell", children: [_jsxs("header", { className: "topbar", children: [_jsxs("div", { children: [_jsx("strong", { children: "Role-aware platform shell" }), _jsx("p", { children: "Reusable DataGrid, i18n-ready routes, and phased module migration." })] }), _jsx("span", { className: "role-pill", children: currentRole })] }), _jsx("main", { className: "content", children: children })] })] }));
}
function ModulePage({ title, body }) {
    return (_jsxs("section", { className: "page-card", children: [_jsx("h1", { children: title }), _jsx("p", { children: body }), _jsxs("div", { className: "grid-preview", children: [_jsxs("article", { className: "preview-card", children: [_jsx("strong", { children: "Desktop table" }), _jsx("span", { children: "Shared DataGrid will render tabular workflows on wide screens." })] }), _jsxs("article", { className: "preview-card", children: [_jsx("strong", { children: "Mobile cards" }), _jsx("span", { children: "The same dataset will collapse into stacked cards for mobile-first usability." })] }), _jsxs("article", { className: "preview-card", children: [_jsx("strong", { children: "Shared forms" }), _jsx("span", { children: "Filters, exports, and mutation flows will be reused across modules." })] })] })] }));
}
export function App() {
    return (_jsx(Shell, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(ModulePage, { title: "Dashboard", body: "Summary KPIs, workload, expiring certificates, and queue health." }) }), _jsx(Route, { path: "/users", element: _jsx(ModulePage, { title: "Users", body: "Admin-managed user directory with RBAC and client scoping." }) }), _jsx(Route, { path: "/clients", element: _jsx(ModulePage, { title: "Clients", body: "Client accounts, contract metadata, and tenant segmentation." }) }), _jsx(Route, { path: "/functional-locations", element: _jsx(ModulePage, { title: "Functional Locations", body: "Rig, workshop, and yard management grouped by client." }) }), _jsx(Route, { path: "/inspectors", element: _jsx(ModulePage, { title: "Inspectors", body: "Inspector profiles, assignment readiness, and certification linkage." }) }), _jsx(Route, { path: "/assets", element: _jsx(ModulePage, { title: "Assets", body: "Asset CRUD, import/export, search, and certificate relationships." }) }), _jsx(Route, { path: "/certificates", element: _jsx(ModulePage, { title: "Certificates", body: "Approval lifecycle, immutable history, uploads, and expiry awareness." }) }), _jsx(Route, { path: "/jobs", element: _jsx(ModulePage, { title: "Jobs", body: "Work orders with inspector assignment, timeline events, and transitions." }) }), _jsx(Route, { path: "/notifications", element: _jsx(ModulePage, { title: "Notifications", body: "In-app center backed by email and web push delivery." }) }), _jsx(Route, { path: "/reports", element: _jsx(ModulePage, { title: "Reports", body: "Operational reports and filtered exports for compliance and planning." }) })] }) }));
}
