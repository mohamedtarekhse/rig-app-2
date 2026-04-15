import { roleSchema, type Role } from '@rigways/types';
import { NavLink, Route, Routes } from 'react-router-dom';

type NavItem = {
  label: string;
  path: string;
  roles: Role[];
};

const navItems: NavItem[] = [
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

const currentRole: Role = 'admin';

function Shell({ children }: { children: React.ReactNode }) {
  const visibleNav = navItems.filter((item) => item.roles.includes(currentRole));

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <strong>Rigways ACM</strong>
          <span>Next-gen rebuild</span>
        </div>
        <nav className="sidebar-nav">
          {visibleNav.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === '/'} className="nav-link">
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <div>
            <strong>Role-aware platform shell</strong>
            <p>Reusable DataGrid, i18n-ready routes, and phased module migration.</p>
          </div>
          <span className="role-pill">{currentRole}</span>
        </header>
        <main className="content">{children}</main>
      </div>
    </div>
  );
}

function ModulePage({ title, body }: { title: string; body: string }) {
  return (
    <section className="page-card">
      <h1>{title}</h1>
      <p>{body}</p>
      <div className="grid-preview">
        <article className="preview-card">
          <strong>Desktop table</strong>
          <span>Shared DataGrid will render tabular workflows on wide screens.</span>
        </article>
        <article className="preview-card">
          <strong>Mobile cards</strong>
          <span>The same dataset will collapse into stacked cards for mobile-first usability.</span>
        </article>
        <article className="preview-card">
          <strong>Shared forms</strong>
          <span>Filters, exports, and mutation flows will be reused across modules.</span>
        </article>
      </div>
    </section>
  );
}

export function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<ModulePage title="Dashboard" body="Summary KPIs, workload, expiring certificates, and queue health." />} />
        <Route path="/users" element={<ModulePage title="Users" body="Admin-managed user directory with RBAC and client scoping." />} />
        <Route path="/clients" element={<ModulePage title="Clients" body="Client accounts, contract metadata, and tenant segmentation." />} />
        <Route path="/functional-locations" element={<ModulePage title="Functional Locations" body="Rig, workshop, and yard management grouped by client." />} />
        <Route path="/inspectors" element={<ModulePage title="Inspectors" body="Inspector profiles, assignment readiness, and certification linkage." />} />
        <Route path="/assets" element={<ModulePage title="Assets" body="Asset CRUD, import/export, search, and certificate relationships." />} />
        <Route path="/certificates" element={<ModulePage title="Certificates" body="Approval lifecycle, immutable history, uploads, and expiry awareness." />} />
        <Route path="/jobs" element={<ModulePage title="Jobs" body="Work orders with inspector assignment, timeline events, and transitions." />} />
        <Route path="/notifications" element={<ModulePage title="Notifications" body="In-app center backed by email and web push delivery." />} />
        <Route path="/reports" element={<ModulePage title="Reports" body="Operational reports and filtered exports for compliance and planning." />} />
      </Routes>
    </Shell>
  );
}
