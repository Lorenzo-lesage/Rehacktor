import React, { useContext } from "react";
import { Box, Typography, Divider, Avatar, useTheme } from "@mui/material";
import { NavLink } from "react-router";
import SessionContext from "../../context/SessionContext";
import useAvatarUrl from "../../hooks/useAvatarUrl";
import LogoutButton from "./LogoutButton";

// Import icons
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import EventIcon from "@mui/icons-material/Event";
import UpdateIcon from "@mui/icons-material/Update";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import CategoryIcon from "@mui/icons-material/Category";
import DevicesIcon from "@mui/icons-material/Devices";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";

function SideBarContent({ navbarHidden }) {
  const theme = useTheme();
  const lastYear = new Date().getFullYear() - 1;
  const { userProfile } = useContext(SessionContext);
  const { avatarUrl } = useAvatarUrl(userProfile?.avatar_url);

  const headerHeight = 64;
  const marginTop = navbarHidden ? 0 : headerHeight;

  const typographyHoverSx = (isActive) => ({
    display: "flex",
    alignItems: "center",
    padding: "0.3rem 1rem",
    cursor: "pointer",
    borderRadius: 2,
    transition: "all 0.25s ease",
    color: isActive ? theme.palette.text.secondary : theme.palette.text.primary,
    fontWeight: 600,

    "&:hover": {
      transform: "translateX(4px)",
    },
    "& svg": {
      color: isActive
        ? theme.palette.primary.main
        : theme.palette.text.disabled,
      transition: "all 0.25s ease",
    },
    "&:hover svg": {
      color: theme.palette.primary.main,
      transform: "scale(1.15)",
    },
  });

  return (
    <Box
      sx={{
        marginTop: `${marginTop}px`,
        height: `calc(100vh - ${marginTop}px)`,
        transition: "margin-top 0.3s ease",
        overflowY: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
        padding: "0 0.5rem 1rem 0.5rem",
      }}
    >
      {userProfile && (
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "0.7rem 1rem",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "text.primary",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                flexGrow: 1,
                minWidth: 0,
              }}
            >
              {userProfile.username}
            </Typography>

            {avatarUrl ? (
              <Avatar src={avatarUrl} sx={{ width: 40, height: 40, ml: 1 }} />
            ) : (
              <Avatar
                sx={{
                  bgcolor: "text.tertiary",
                  width: 40,
                  height: 40,
                  fontSize: 13,
                  ml: 1,
                }}
              >
                {userProfile.first_name?.charAt(0).toUpperCase()}
                {userProfile.last_name?.charAt(0).toUpperCase()}
              </Avatar>
            )}
          </Box>

          <Box>
            <NavLink to="/profile">
              {({ isActive }) => (
                <Typography variant="body1" sx={typographyHoverSx(isActive)}>
                  <PersonIcon sx={{ mr: 1 }} fontSize="small" />
                  Profile
                </Typography>
              )}
            </NavLink>
          </Box>

          <Box>
            <NavLink to="/whishlist">
              {({ isActive }) => (
                <Typography variant="body1" sx={typographyHoverSx(isActive)}>
                  <FavoriteIcon sx={{ mr: 1 }} fontSize="small" />
                  Whishlist
                </Typography>
              )}
            </NavLink>
          </Box>

          <Box>
            <LogoutButton />
          </Box>
        </Box>
      )}

      {/* New Releases */}
      <Box sx={{ mb: 2 }}>
        <Divider />
        <Typography
          variant="h5"
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "0.7rem 1rem",
            fontWeight: 600,
            color: "text.primary",
          }}
        >
          New Realeases
        </Typography>

        <Box>
          <NavLink to="/top-games-month">
            {({ isActive }) => (
              <Typography variant="body1" sx={typographyHoverSx(isActive)}>
                <EventIcon sx={{ mr: 1 }} fontSize="small" />
                Last Month
              </Typography>
            )}
          </NavLink>
        </Box>

        <Box>
          <NavLink to="/year-games">
            {({ isActive }) => (
              <Typography variant="body1" sx={typographyHoverSx(isActive)}>
                <UpdateIcon sx={{ mr: 1 }} fontSize="small" />
                This Year
              </Typography>
            )}
          </NavLink>
        </Box>

        <Box>
          <NavLink to="/coming-soon">
            {({ isActive }) => (
              <Typography variant="body1" sx={typographyHoverSx(isActive)}>
                <QueryBuilderIcon sx={{ mr: 1 }} fontSize="small" />
                Coming Soon...
              </Typography>
            )}
          </NavLink>
        </Box>
      </Box>

      {/* Top games */}
      <Box sx={{ mb: 2 }}>
        <Divider />
        <Typography
          variant="h5"
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "0.7rem 1rem",
            fontWeight: 600,
            color: "text.primary",
          }}
        >
          Top
        </Typography>

        <Box>
          <NavLink to="/top-games">
            {({ isActive }) => (
              <Typography variant="body1" sx={typographyHoverSx(isActive)}>
                <EmojiEventsIcon sx={{ mr: 1 }} fontSize="small" />
                Top of The Week
              </Typography>
            )}
          </NavLink>
        </Box>

        <Box>
          <NavLink to="/top-games-last-year">
            {({ isActive }) => (
              <Typography variant="body1" sx={typographyHoverSx(isActive)}>
                <WorkspacePremiumIcon sx={{ mr: 1 }} fontSize="small" />
                Best of {lastYear}
              </Typography>
            )}
          </NavLink>
        </Box>

        <Box>
          <NavLink to="/top-all-time-games">
            {({ isActive }) => (
              <Typography variant="body1" sx={typographyHoverSx(isActive)}>
                <WorkspacePremiumIcon sx={{ mr: 1 }} fontSize="small" />
                Top 250 Of All Time
              </Typography>
            )}
          </NavLink>
        </Box>
      </Box>

      {/* Games section */}
      <Box sx={{ mb: 2 }}>
        <Divider />
        <Typography
          variant="h5"
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "0.7rem 1rem",
            fontWeight: 600,
            color: "text.primary",
          }}
        >
          Games
        </Typography>

        <Box>
          <NavLink to="/all-games">
            {({ isActive }) => (
              <Typography variant="body1" sx={typographyHoverSx(isActive)}>
                <SportsEsportsIcon sx={{ mr: 1 }} fontSize="small" />
                All Games
              </Typography>
            )}
          </NavLink>
        </Box>

        <Box>
          <NavLink to="/genres">
            {({ isActive }) => (
              <Typography variant="body1" sx={typographyHoverSx(isActive)}>
                <CategoryIcon sx={{ mr: 1 }} fontSize="small" />
                Genres
              </Typography>
            )}
          </NavLink>
        </Box>
      </Box>

      {/* Browse section */}
      <Box>
        <Divider />
        <Typography
          variant="h5"
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "0.7rem 1rem",
            fontWeight: 600,
            color: "text.primary",
          }}
        >
          Browse
        </Typography>

        <Box>
          <NavLink to="/platforms">
            {({ isActive }) => (
              <Typography variant="body1" sx={typographyHoverSx(isActive)}>
                <DevicesIcon sx={{ mr: 1 }} fontSize="small" />
                Platforms
              </Typography>
            )}
          </NavLink>
        </Box>

        <Box>
          <NavLink to="/stores">
            {({ isActive }) => (
              <Typography variant="body1" sx={typographyHoverSx(isActive)}>
                <StorefrontIcon sx={{ mr: 1 }} fontSize="small" />
                Stores
              </Typography>
            )}
          </NavLink>
        </Box>

        <Box>
          <NavLink to="/tags">
            {({ isActive }) => (
              <Typography variant="body1" sx={typographyHoverSx(isActive)}>
                <LocalOfferOutlinedIcon sx={{ mr: 1 }} fontSize="small" />
                Tags
              </Typography>
            )}
          </NavLink>
        </Box>

        <Box>
          <NavLink to="/publishers">
            {({ isActive }) => (
              <Typography variant="body1" sx={typographyHoverSx(isActive)}>
                <BusinessOutlinedIcon sx={{ mr: 1 }} fontSize="small" />
                Publishers
              </Typography>
            )}
          </NavLink>
        </Box>

        <Box>
          <NavLink to="/developers">
            {({ isActive }) => (
              <Typography variant="body1" sx={typographyHoverSx(isActive)}>
                <CodeOutlinedIcon sx={{ mr: 1 }} fontSize="small" />
                Developers
              </Typography>
            )}
          </NavLink>
        </Box>

        <Box>
          <NavLink to="/creators">
            {({ isActive }) => (
              <Typography variant="body1" sx={typographyHoverSx(isActive)}>
                <CreateOutlinedIcon sx={{ mr: 1 }} fontSize="small" />
                Creators
              </Typography>
            )}
          </NavLink>
        </Box>
      </Box>
    </Box>
  );
}

export default SideBarContent;
