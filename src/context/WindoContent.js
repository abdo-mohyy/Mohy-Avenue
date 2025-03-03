import { createContext, useEffect, useState } from "react";

export const WindowSize = createContext();

export default function WindowContext({ children }) {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    function catchWidnowSize() {
      setWindowSize(window.innerWidth);
    }

    window.addEventListener("resize", catchWidnowSize);

    return () => {
      window.removeEventListener("resize", catchWidnowSize);
    };
  });

  return (
    <WindowSize.Provider value={{ windowSize, setWindowSize }}>
      {children}
    </WindowSize.Provider>
  );
}
