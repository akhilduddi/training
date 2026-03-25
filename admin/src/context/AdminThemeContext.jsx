import { createContext, useContext, useState, useEffect } from 'react';

const AdminThemeContext = createContext();

export const useAdminTheme = () => useContext(AdminThemeContext);

export const AdminThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Default to 'light'
    return localStorage.getItem('admin-theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('admin-theme', theme);
  }, [theme]);

  return (
    <AdminThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`admin-theme-${theme} font-sans min-h-screen text-[color:var(--admin-text-primary)] bg-[color:var(--admin-bg-main)]`}>
        {children}
      </div>
    </AdminThemeContext.Provider>
  );
};
