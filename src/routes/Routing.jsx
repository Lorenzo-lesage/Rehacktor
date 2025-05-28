import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "../layout/Layout";
import HomePage from "../pages/homepage/index";
import ErrorPage from "../pages/error/index";

export function Routing() {
  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
