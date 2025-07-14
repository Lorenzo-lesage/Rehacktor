import { Routing } from "./routes/Routing";
import "react-toastify/dist/ReactToastify.css";
import SessionProvider from "./context/SessionProvider";
import FavoritesProvider from "./context/FavoritesProvider";
import BackgroundProvider from "./context/BackgroundProvider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SnackbarProviderWrapper from "./components/toast/SnackbarProviderWrapper";

if (typeof global === "undefined") {
  window.global = window;
}

function App() {
  return (
    <>
      <SessionProvider>
        <FavoritesProvider>
          <BackgroundProvider>
            <SnackbarProviderWrapper>
              <Routing />
            </SnackbarProviderWrapper>
          </BackgroundProvider>
        </FavoritesProvider>
      </SessionProvider>
    </>
  );
}

export default App;
