import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "../layout/Layout";
import HomePage from "../pages/homepage/index";
import ErrorPage from "../pages/error/index";
import GenrePage from "../pages/genrepage/index";
import GamePage from "../pages/gamepage/index";
import SearchPage from "../pages/searchpage/index";
import RegisterPage from "../pages/register/index";
import LoginPage from "../pages/login/index";
import AccountPage from "../pages/account/index";
import ProfilePage from "../pages/profile";
import TopGamesPage from "../pages/topgamesweekpage";
import TopGamesMonthPage from "../pages/topgamesmonthpage/index";
import ComingSoonPage from "../pages/comingsoonpage/index";
import YearGamesPage from "../pages/yeargamepage/index";
import TopGamesLastYear from "../pages/topgameslastyear/index";
import TopAllTimeGamesPage from "../pages/topalltimegamespage/index";
import AllGamesPage from "../pages/allgamespage";

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
          {/* Home page */}
          <Route path="/" element={<HomePage />} />
          {/* Genre game */}
          <Route path="/games/:genre" element={<GenrePage />} />
          {/* Details game */}
          <Route path="/games/:slug/:id" element={<GamePage />} />
          {/* Search game */}
          <Route path="/search" element={<SearchPage />} />
          {/* Register page */}
          <Route path="/register" element={<RegisterPage />} />
          {/* Login page */}
          <Route path="/login" element={<LoginPage />} />
          {/* Edit Account page */}
          <Route path="/account" element={<AccountPage />} />
          {/* Profile page */}
          <Route path="/profile" element={<ProfilePage />} />
          {/* Top games page */}
          <Route path="/top-games" element={<TopGamesPage />} />
          {/* Top games month page */}
          <Route path="/top-games-month" element={<TopGamesMonthPage />} />
          {/* Coming soon page */}
          <Route path="/coming-soon" element={<ComingSoonPage />} />
          {/* Year games page */}
          <Route path="/year-games" element={<YearGamesPage />} />
          {/* Top games last year page */}
          <Route path="/top-games-last-year" element={<TopGamesLastYear />} />
          {/* Top all time games page */}
          <Route path="/top-all-time-games" element={<TopAllTimeGamesPage />} />
          {/* All games page */}
          <Route path="/all-games" element={<AllGamesPage />} />
          {/* Error page */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
