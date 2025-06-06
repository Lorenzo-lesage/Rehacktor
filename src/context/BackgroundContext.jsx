import React, { createContext, useState, useContext } from "react";

const BackgroundContext = createContext();

export function BackgroundProvider({ children }) {
  const [backgroundImage, setBackgroundImage] = useState(null);

  return (
    <BackgroundContext.Provider value={{ backgroundImage, setBackgroundImage }}>
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  return useContext(BackgroundContext);
}

export default BackgroundContext;