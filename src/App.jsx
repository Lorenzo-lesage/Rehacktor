import { Routing } from "./routes/Routing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SessionProvider from "./context/SessionProvider";
import FavoritesProvider from "./context/FavoritesProvider";
import BackgroundProvider from "./context/BackgroundProvider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

if (typeof global === "undefined") {
  window.global = window;
}
import "react-image-lightbox/style.css";

function App() {
  return (
    <>
      <SessionProvider>
        <FavoritesProvider>
          <BackgroundProvider>
            <Routing />
            <ToastContainer position="top-right" autoClose={3000} />
          </BackgroundProvider>
        </FavoritesProvider>
      </SessionProvider>
    </>
  );
}

export default App;
