import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "../layout/Layout";
import HomePage from "../pages/homepage/index";
import ErrorPage from "../pages/error/index";
import GenrePage from "../pages/genrepage/index";
import GamePage from "../pages/gampepage/index";
import SearchPage from "../pages/searchpage/index";

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
          {/* HomePage */}
          <Route path="/" element={<HomePage />} />
          {/* Genre game */}
          <Route path="/games/:genre" element={<GenrePage />} />
          {/* Details game */}
          <Route path="/games/:slug/:id" element={<GamePage />} />
          {/* Search game */}
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
