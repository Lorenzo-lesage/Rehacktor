import React, { useState } from "react";
import BackgroundContext from "./BackgroundContext";

function BackgroundProvider({ children }) {
  const [backgroundImage, setBackgroundImage] = useState(null);

  return (
    <BackgroundContext.Provider value={{ backgroundImage, setBackgroundImage }}>
      {children}
    </BackgroundContext.Provider>
  );
}

export default BackgroundProvider;
