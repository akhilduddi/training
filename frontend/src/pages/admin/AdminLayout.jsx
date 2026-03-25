import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAdminTheme } from '../../context/AdminThemeContext';
import {
  LayoutDashboard, Building2, Users, Star, BarChart2, LogOut, Menu, ShieldCheck, Sun, Moon, Monitor
} from 'lucide-react';

const navLinks = [
  { to: '/admin', label: 'Dashboard',  Icon: LayoutDashboard, end: true },
  { to: '/admin/companies', label: 'Companies',  Icon: Building2  },
  { to: '/admin/users',     label: 'Users',       Icon: Users      },
  { to: '/admin/reviews',   label: 'Reviews',     Icon: Star       },
  { to: '/admin/analytics', label: 'Analytics',   Icon: BarChart2  },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, setTheme } = useAdminTheme();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 ${
      isActive
        ? 'bg-blue-600 text-white shadow-md'
        : 'text-[color:var(--admin-text-secondary)] hover:bg-[color:var(--admin-hover)] hover:text-[color:var(--admin-text-primary)]'
    }`;

  const Sidebar = () => (
    <aside className="flex flex-col h-full w-64 flex-shrink-0 bg-[color:var(--admin-bg-nav)] border-r border-[color:var(--admin-border)]">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-[color:var(--admin-border)]">
        <ShieldCheck className="h-7 w-7 text-blue-500" />
        <div>
          <p className="font-bold text-[color:var(--admin-text-primary)] text-sm leading-tight">cGxP Admin</p>
          <p className="text-xs text-[color:var(--admin-text-secondary)] uppercase tracking-widest">Control Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {navLinks.map(({ to, label, Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={linkClass}>
            <Icon className="h-4 w-4 flex-shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User Footer */}
      <div className="px-4 py-4 border-t border-[color:var(--admin-border)]">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
            {user?.name?.charAt(0)?.toUpperCase() || 'A'}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[color:var(--admin-text-primary)] truncate">{user?.name || 'Admin'}</p>
            <p className="text-xs text-[color:var(--admin-text-secondary)] truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-[color:var(--admin-text-secondary)] hover:text-red-500 hover:bg-[color:var(--admin-hover)] rounded-lg transition-colors"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[color:var(--admin-bg-main)]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex z-10">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="px-4 lg:px-8 py-3 flex items-center gap-4 flex-shrink-0 bg-[color:var(--admin-bg-nav)] border-b border-[color:var(--admin-border)]">
          <button
            className="lg:hidden text-[color:var(--admin-text-secondary)] hover:text-[color:var(--admin-text-primary)]"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-[color:var(--admin-text-primary)] font-semibold text-sm uppercase tracking-widest hidden sm:block">
            Admin Portal
          </h1>
          <div className="ml-auto flex items-center gap-4">
            {/* Theme Switcher */}
            <div className="flex bg-[color:var(--admin-bg-main)] border border-[color:var(--admin-border)] rounded-lg p-1">
              <button
                onClick={() => setTheme('light')}
                className={`p-1.5 rounded-md transition-colors ${theme === 'light' ? 'bg-white text-blue-600 shadow border border-gray-200' : 'text-[color:var(--admin-text-secondary)] hover:text-[color:var(--admin-text-primary)]'}`}
                title="Light Theme"
              >
                <Sun className="h-4 w-4" />
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`p-1.5 rounded-md transition-colors ${theme === 'dark' ? 'bg-[#1e293b] text-blue-400 shadow border border-[#334155]' : 'text-[color:var(--admin-text-secondary)] hover:text-[color:var(--admin-text-primary)]'}`}
                title="Dark Theme"
              >
                <Moon className="h-4 w-4" />
              </button>
              <button
                onClick={() => setTheme('black')}
                className={`p-1.5 rounded-md transition-colors ${theme === 'black' ? 'bg-zinc-800 text-white shadow border border-zinc-700' : 'text-[color:var(--admin-text-secondary)] hover:text-[color:var(--admin-text-primary)]'}`}
                title="Black Theme"
              >
                <Monitor className="h-4 w-4" />
              </button>
            </div>
            <span className="hidden sm:inline-block text-xs text-blue-600 font-semibold border border-blue-500/30 bg-blue-500/10 px-2 py-1 rounded">
              ADMINISTRATOR
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
