import { Routing } from "./routes/Routing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SessionProvider from "./context/SessionProvider";
import FavoritesProvider from "./context/FavoritesProvider";

function App() {
  return (
    <>
      <SessionProvider>
        <FavoritesProvider>
          <Routing />
          <ToastContainer position="top-right" autoClose={3000} />
        </FavoritesProvider>
      </SessionProvider>
    </>
  );
}

export default App;
