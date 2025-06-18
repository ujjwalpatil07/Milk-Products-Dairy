import { createContext, useState, useMemo } from "react";

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [navbarInput, setNavbarInput] = useState("");

  const contextValue = useMemo(() => ({
    isSidebarOpen,
    navbarInput,
    setIsSidebarOpen,
    setNavbarInput
  }), [isSidebarOpen, navbarInput]);

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
};
