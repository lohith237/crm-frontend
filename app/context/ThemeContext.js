"use client";
import { createContext,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const theme = useSelector((state) => state.theme.mode)
  const dispatch = useDispatch()
  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };
useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
