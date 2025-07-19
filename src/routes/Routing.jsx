import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "../layout/Layout";
import HomePage from "../pages/homepage/index";
import ErrorPage from "../pages/error/index";
import GenreListPage from "../pages/genrelistpage/index";
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
import WhishListPage from "../pages/whishlistpage/index";
import PlatformPage from "../pages/platformpage/index";
import StorePage from "../pages/storespage/index";
import TagPage from "../pages/tagpage/index";
import PublisherPage from "../pages/publisherpage/index";
import DevelopersPage from "../pages/developerspage/index";
import CreatorPage from "../pages/creatorpage/index";
import AuthCallback from "../pages/AuthCallback";
import ScrollToTop from "../components/ScrollToTop";

export function Routing() {
  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          {/* Home page */}
          <Route path="/" element={<HomePage />} />
          {/* Genre List page */}
          <Route path="/genres" element={<GenreListPage />} />
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
          {/* WhishList page */}
          <Route path="/whishlist" element={<WhishListPage />} />
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
          {/* Platform page */}
          <Route path="/platforms" element={<PlatformPage />} />
          {/* Store page */}
          <Route path="/stores" element={<StorePage />} />
          {/* Tag page */}
          <Route path="/tags" element={<TagPage />} />
          {/* Publisher page */}
          <Route path="/publishers" element={<PublisherPage />} />
          {/* Developer page */}
          <Route path="/developers" element={<DevelopersPage />} />
          {/* Creator page */}
          <Route path="/creators" element={<CreatorPage />} />
          {/* Auth callback page */}
          <Route path="/auth/callback" element={<AuthCallback />} />
          {/* Error page */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
