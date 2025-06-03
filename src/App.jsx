import { Routing } from "./routes/Routing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SessionProvider from "./context/SessionProvider";

function App() {
  return (
    <>
      <SessionProvider>
        <Routing />
        <ToastContainer position="top-right" autoClose={3000} />
      </SessionProvider>
    </>
  );
}

export default App;
