import { useState } from "react";

export const useDarkMode = () => {
  const [theme, setTheme] = useState(true);

  const toggleTheme = () => {
    theme ? setTheme(false) : setTheme(true);
  };

  return [theme, toggleTheme];
};
