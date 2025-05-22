import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('adminTheme') || 'light';
  });

  useEffect(() => {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(theme === 'dark' ? 'dark-theme' : 'light-theme');
    localStorage.setItem('adminTheme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);


// import React, { createContext, useState, useEffect } from 'react';

// export const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState(() => {
//     return localStorage.getItem('adminTheme') || 'light';
//   });

//   useEffect(() => {
//     document.body.classList.remove('light-theme', 'dark-theme');
//     document.body.classList.add(theme === 'dark' ? 'dark-theme' : 'light-theme');
//     localStorage.setItem('adminTheme', theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
