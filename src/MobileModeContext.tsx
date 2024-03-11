import React, { createContext, useContext, useState, useEffect } from "react";

interface MobileModeContextType {
  isMobile: boolean;
}

const MobileModeContext = createContext<MobileModeContextType>({
  isMobile: false,
});

export const useMobileMode = () => useContext(MobileModeContext);

interface MobileModeProviderProps {
  children: React.ReactNode; // Specify children prop
}

export const MobileModeProvider = ({ children }: MobileModeProviderProps) => {
  const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 600px)").matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");

    const handleResize = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleResize);

    // Initial check
    setIsMobile(mediaQuery.matches);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return (
    <MobileModeContext.Provider value={{ isMobile }}>
      {children}
    </MobileModeContext.Provider>
  );
};
  
export default MobileModeProvider;