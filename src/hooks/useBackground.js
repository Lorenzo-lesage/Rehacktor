import { useContext } from "react";
import BackgroundContext from "../context/BackgroundContext";

export function useBackground() {
  return useContext(BackgroundContext);
}
