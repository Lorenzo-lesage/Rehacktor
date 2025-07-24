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

function SideBarContent({ navbarHidden, open, setOpen }) {
  /*
  |--------------------------------------------------------
  | Data
  |--------------------------------------------------------
   */

  const lastYear = new Date().getFullYear() - 1;
  const { userProfile } = useContext(SessionContext);
  const { avatarUrl } = useAvatarUrl(userProfile?.avatar_url);
  const theme = useTheme();

  const headerHeight = 64;
  const marginTop = navbarHidden ? 0 : headerHeight;

  /*
  |--------------------------------------------------------
  | Style
  |--------------------------------------------------------
   */

  const typographyHoverSx = (isActive) => ({
    display: "flex",
    alignItems: "center",
    padding: "0.3rem 1rem",
    cursor: "pointer",
    borderRadius: 2,
    color: isActive ? theme.palette.text.secondary : theme.palette.text.primary,
    fontWeight: 600,
    transition: "color 0.25s ease, transform 0.25s ease",
    justifyContent: "flex-start",
    gap: 1,
    "&:hover": {
      transform: "translateX(4px)",
      color: theme.palette.primary.main,
    },
    "& svg": {
      color: isActive
        ? theme.palette.primary.main
        : theme.palette.text.disabled,
      transition: "color 0.25s ease, transform 0.25s ease",
    },
    "&:hover svg": {
      backgroundColor: theme.palette.background.iconHover,
      transform: "none"
    },
  });

  const styleIcon = {
    fontSize: "2rem",
    padding: "0.3rem",
    backgroundColor: theme.palette.background.icon,
    borderRadius: 1,
    transition: "all 0.25s ease",
  };

  /*
  |--------------------------------------------------------
  | Return
  |--------------------------------------------------------
   */

  return (
    <Box
      sx={{
        marginTop: { md: 0, lg: `${marginTop}px` },
        height: { xs: "100vh", lg: `calc(100vh - ${marginTop}px)` },
        transition: "all 0.2s ease-in-out",
        overflowY: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
        padding: "0 0.5rem 1rem 0.5rem",
        backgroundColor: open ? "background.sidebar" : "transparent",
        borderRadius: { xs: 0, lg: "0 0.3rem 0.3rem 0" },
      }}
    >
      {userProfile && (
        <Box sx={{ mb: 2 }}>
          {userProfile.username && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "0.7rem 1rem",
                justifyContent: "flex-start",
                transition: "all 0.3s ease-in-out",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: "text.disabled",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  flexGrow: 1,
                  marginRight: 1,
                  minWidth: 0,
                  display: {
                    xs: "block",
                    lg: open ? "block" : "none",
                  },
                }}
              >
                {userProfile.username &&
                  userProfile.username.charAt(0).toUpperCase() +
                    userProfile.username.slice(1).toLowerCase()}
              </Typography>

              {avatarUrl ? (
                <Avatar
                  src={avatarUrl}
                  sx={{
                    width: 40,
                    height: 40,
                  }}
                />
              ) : (
                <Avatar
                  sx={{
                    bgcolor: "text.tertiary",
                    width: 40,
                    height: 40,
                    fontSize: 13,
                  }}
                >
                  {userProfile.first_name?.charAt(0).toUpperCase()}
                  {userProfile.last_name?.charAt(0).toUpperCase()}
                </Avatar>
              )}
            </Box>
          )}

          <Box>
            <NavLink to="/profile">
              {({ isActive }) => (
                <Box sx={typographyHoverSx(isActive)}>
                  <PersonIcon fontSize="small" sx={styleIcon} />
                  <Typography
                    variant="body1"
                    sx={{
                      display: {
                        xs: "block",
                        lg: open ? "block" : "none",
                      },
                      whiteSpace: "nowrap",
                    }}
                  >
                    Profile
                  </Typography>
                </Box>
              )}
            </NavLink>
          </Box>

          <Box>
            <NavLink to="/whishlist">
              {({ isActive }) => (
                <Box sx={typographyHoverSx(isActive)}>
                  <FavoriteIcon fontSize="small" sx={styleIcon} />
                  <Typography
                    variant="body1"
                    sx={{
                      display: {
                        xs: "block",
                        lg: open ? "block" : "none",
                      },
                      whiteSpace: "nowrap",
                    }}
                  >
                    Whishlist
                  </Typography>
                </Box>
              )}
            </NavLink>
          </Box>

          <Box sx={{ mb: 2 }}>
            <LogoutButton open={open} setOpen={setOpen} />
          </Box>
          <Divider />
        </Box>
      )}

      {/* New Releases */}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h5"
          sx={{
            display: {
              xs: "flex",
              lg: "none",
            },
            alignItems: "center",
            padding: "0.7rem 1rem",
            fontWeight: 600,
            color: "text.disabled",
          }}
        >
          New Realeases
        </Typography>

        <Typography
          variant="h5"
          sx={{
            display: {
              xs: "none",
              lg: "flex",
            },
            alignItems: "center",
            padding: "0.7rem 1rem",
            fontWeight: 600,
            color: "text.disabled",
            whiteSpace: "nowrap",
          }}
        >
          {open ? "New Realeases" : "New"}
        </Typography>

        {/* Last Month */}
        <Box>
          <NavLink to="/top-games-month">
            {({ isActive }) => (
              <Box sx={typographyHoverSx(isActive)}>
                <EventIcon fontSize="small" sx={styleIcon} />
                <Typography
                  variant="body1"
                  sx={{
                    display: {
                      xs: "block",
                      lg: open ? "block" : "none",
                    },
                    whiteSpace: "nowrap",
                  }}
                >
                  Last Month
                </Typography>
              </Box>
            )}
          </NavLink>
        </Box>

        {/* This Year */}
        <Box>
          <NavLink to="/year-games">
            {({ isActive }) => (
              <Box sx={typographyHoverSx(isActive)}>
                <UpdateIcon fontSize="small" sx={styleIcon} />
                <Typography
                  variant="body1"
                  sx={{
                    display: {
                      xs: "block",
                      lg: open ? "block" : "none",
                      whiteSpace: "nowrap",
                    },
                  }}
                >
                  This Year
                </Typography>
              </Box>
            )}
          </NavLink>
        </Box>

        <Box>
          <NavLink to="/coming-soon">
            {({ isActive }) => (
              <Box variant="body1" sx={typographyHoverSx(isActive)}>
                <QueryBuilderIcon fontSize="small" sx={styleIcon} />
                <Typography
                  variant="body1"
                  sx={{
                    display: {
                      xs: "block",
                      lg: open ? "block" : "none",
                    },
                    whiteSpace: "nowrap",
                  }}
                >
                  Coming Soon...
                </Typography>
              </Box>
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
            color: "text.disabled",
          }}
        >
          Top
        </Typography>

        <Box>
          <NavLink to="/top-games">
            {({ isActive }) => (
              <Box sx={typographyHoverSx(isActive)}>
                <EmojiEventsIcon fontSize="small" sx={styleIcon} />
                <Typography
                  variant="body1"
                  sx={{
                    display: {
                      xs: "block",
                      lg: open ? "block" : "none",
                    },
                    whiteSpace: "nowrap",
                  }}
                >
                  Top of The Week
                </Typography>
              </Box>
            )}
          </NavLink>
        </Box>

        <Box>
          <NavLink to="/top-games-last-year">
            {({ isActive }) => (
              <Box sx={typographyHoverSx(isActive)}>
                <WorkspacePremiumIcon fontSize="small" sx={styleIcon} />
                <Typography
                  variant="body1"
                  sx={{
                    display: {
                      xs: "block",
                      lg: open ? "block" : "none",
                    },
                    whiteSpace: "nowrap",
                  }}
                >
                  Best of {lastYear}
                </Typography>
              </Box>
            )}
          </NavLink>
        </Box>

        <Box>
          <NavLink to="/top-all-time-games">
            {({ isActive }) => (
              <Box sx={typographyHoverSx(isActive)}>
                <WorkspacePremiumIcon fontSize="small" sx={styleIcon} />
                <Typography
                  variant="body1"
                  sx={{
                    display: {
                      xs: "block",
                      lg: open ? "block" : "none",
                    },
                    whiteSpace: "nowrap",
                  }}
                >
                  Top 250 Of All Time
                </Typography>
              </Box>
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
            color: "text.disabled",
          }}
        >
          Games
        </Typography>

        <Box>
          <NavLink to="/all-games">
            {({ isActive }) => (
              <Box sx={typographyHoverSx(isActive)}>
                <SportsEsportsIcon fontSize="small" sx={styleIcon} />
                <Typography
                  variant="body1"
                  sx={{
                    display: {
                      xs: "block",
                      lg: open ? "block" : "none",
                    },
                    whiteSpace: "nowrap",
                  }}
                >
                  All Games
                </Typography>
              </Box>
            )}
          </NavLink>
        </Box>

        <Box>
          <NavLink to="/genres">
            {({ isActive }) => (
              <Box variant="body1" sx={typographyHoverSx(isActive)}>
                <CategoryIcon fontSize="small" sx={styleIcon} />
                <Typography
                  variant="body1"
                  sx={{
                    display: {
                      xs: "block",
                      lg: open ? "block" : "none",
                    },
                    whiteSpace: "nowrap",
                  }}
                >
                  Genres
                </Typography>
              </Box>
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
            color: "text.disabled",
          }}
        >
          Browse
        </Typography>

        <Box>
          <NavLink to="/platforms">
            {({ isActive }) => (
              <Box sx={typographyHoverSx(isActive)}>
                <DevicesIcon fontSize="small" sx={styleIcon} />
                <Typography
                  variant="body1"
                  sx={{
                    display: {
                      xs: "block",
                      lg: open ? "block" : "none",
                    },
                    whiteSpace: "nowrap",
                  }}
                >
                  Platforms
                </Typography>
              </Box>
            )}
          </NavLink>
        </Box>

        <Box>
          <NavLink to="/stores">
            {({ isActive }) => (
              <Box sx={typographyHoverSx(isActive)}>
                <StorefrontIcon fontSize="small" sx={styleIcon} />
                <Typography
                  variant="body1"
                  sx={{
                    display: {
                      xs: "block",
                      lg: open ? "block" : "none",
                    },
                    whiteSpace: "nowrap",
                  }}
                >
                  Stores
                </Typography>
              </Box>
            )}
          </NavLink>
        </Box>

        <Box>
          <NavLink to="/tags">
            {({ isActive }) => (
              <Box sx={typographyHoverSx(isActive)}>
                <LocalOfferOutlinedIcon fontSize="small" sx={styleIcon} />
                <Typography
                  variant="body1"
                  sx={{
                    display: {
                      xs: "block",
                      lg: open ? "block" : "none",
                    },
                    whiteSpace: "nowrap",
                  }}
                >
                  Tags
                </Typography>
              </Box>
            )}
          </NavLink>
        </Box>

        <Box>
          <NavLink to="/publishers">
            {({ isActive }) => (
              <Box sx={typographyHoverSx(isActive)}>
                <BusinessOutlinedIcon fontSize="small" sx={styleIcon} />
                <Typography
                  variant="body1"
                  sx={{
                    display: {
                      xs: "block",
                      lg: open ? "block" : "none",
                    },
                    whiteSpace: "nowrap",
                  }}
                >
                  Publishers
                </Typography>
              </Box>
            )}
          </NavLink>
        </Box>

        <Box>
          <NavLink to="/developers">
            {({ isActive }) => (
              <Box sx={typographyHoverSx(isActive)}>
                <CodeOutlinedIcon fontSize="small" sx={styleIcon} />
                <Typography
                  variant="body1"
                  sx={{
                    display: {
                      xs: "block",
                      lg: open ? "block" : "none",
                    },
                    whiteSpace: "nowrap",
                  }}
                >
                  Developers
                </Typography>
              </Box>
            )}
          </NavLink>
        </Box>

        <Box>
          <NavLink to="/creators">
            {({ isActive }) => (
              <Box sx={typographyHoverSx(isActive)}>
                <CreateOutlinedIcon fontSize="small" sx={styleIcon} />
                <Typography
                  variant="body1"
                  sx={{
                    display: {
                      xs: "block",
                      lg: open ? "block" : "none",
                    },
                    whiteSpace: "nowrap",
                  }}
                >
                  Creators
                </Typography>
              </Box>
            )}
          </NavLink>
        </Box>
      </Box>
    </Box>
  );
}

export default SideBarContent;
