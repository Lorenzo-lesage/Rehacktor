import { useScrollTrigger } from "@mui/material";

function useHeaderVisible(window) {
  return !useScrollTrigger({ target: window ? window() : undefined });
}

export default useHeaderVisible;