import { createContext } from "react";

const SessionContext = createContext({
  session: null,
  userProfile: null,
  setUserProfile: () => {},
});

export default SessionContext;
