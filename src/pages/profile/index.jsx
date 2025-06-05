import { useContext } from "react";
import SessionContext from "../../context/SessionContext";
import FavoritesContext from "../../context/FavoritesContext";
import {
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
  Alert,
  Tooltip,
  Avatar,
  Divider,
} from "@mui/material";
import { Link } from "react-router";
import CardFavoriteItem from "../../components/game/CardFavoriteItem";
import useAvatarUrl from "../../hooks/useAvatarUrl";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import EditNoteIcon from "@mui/icons-material/EditNote";

function ProfilePage() {
  /*
  |----------------------------------------------------------------
  | Data
  |----------------------------------------------------------------
  */

  const { userProfile } = useContext(SessionContext);
  const { favorites } = useContext(FavoritesContext);
  const { avatarUrl } = useAvatarUrl(userProfile?.avatar_url);
  favorites.forEach((game) => console.log(game));
  const sortedFavorites = [...favorites].reverse();

  /*
  |----------------------------------------------------------------
  | Return
  |----------------------------------------------------------------
  */
  return (
    <Box sx={{ p: 1,  backgroundColor: "background.default", boxShadow: 6, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Hey{" "}
        {userProfile?.username
          ? userProfile.username.charAt(0).toUpperCase() +
            userProfile.username.slice(1)
          : "User"}
      </Typography>
      <Divider />
      <Box
        sx={{
          display: { xs: "flex", md: "flex" },
          flexDirection: { xs: "column-reverse", md: "row" },
          justifyContent: "space-around",
          my: 5,
          gap: 2,
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "50%" }, textAlign: "left", boxShadow: 3, borderRadius: 2, p: 2, bgcolor: "background.paper" }}>
          <Typography variant="h6">Lorem ipsum</Typography>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            repellat dignissimos obcaecati totam veniam laborum expedita
            assumenda. Sint adipisci ut cumque impedit, delectus reiciendis
            asperiores! Voluptates aspernatur pariatur sit deleniti? Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Aut voluptatem atque in
            libero hic aliquam tempore quia quaerat. Voluptates repellat unde
            sequi dignissimos animi consectetur illo nihil maiores iure
            accusantium.
          </Typography>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            textAlign: "center",
            display: { xs: "block", md: "flex" },
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            borderRadius: "10px",
            p: 2,
            position: "relative",
            backgroundColor: "background.paper",
            boxShadow: 6,
          }}
        >
          <Box sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}>
            <Link to="/account">
              <IconButton
                variant="contained"
                sx={{
                  position: "relative",
                  backgroundColor: "background.paper",
                }}
                size="small"
              >
                <EditNoteIcon />
              </IconButton>
            </Link>
          </Box>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Avatar
              sx={{
                width: { xs: 150, md: 200 },
                height: { xs: 150, md: 200 },
                boxShadow: "3px 3px 8px black",
              }}
              src={avatarUrl}
            />
          </Box>
          <Box
            sx={{
              textAlign: "left",
              width: "100%",
              minHeight: 150,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <Typography
              sx={{
                wordBreak: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "normal",
              }}
            >
              <strong>Name:</strong>{" "}
              {userProfile?.first_name
                ? userProfile.first_name.charAt(0).toUpperCase() +
                  userProfile.first_name.slice(1)
                : "User"}
            </Typography>
            <Divider />
            <Typography
              sx={{
                wordBreak: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "normal",
              }}
            >
              <strong>Surname:</strong>{" "}
              {userProfile?.last_name
                ? userProfile.last_name.charAt(0).toUpperCase() +
                  userProfile.last_name.slice(1)
                : "User"}
            </Typography>
            <Divider />

            <Typography
              sx={{
                wordBreak: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "normal",
              }}
            >
              <strong>Username:</strong>{" "}
              {userProfile?.username
                ? userProfile.username.charAt(0).toUpperCase() +
                  userProfile.username.slice(1)
                : "User"}
            </Typography>
            <Divider />
          </Box>
        </Box>
      </Box>

      {/* Favorites */}
      <Box
        sx={{
          mt: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Your favorites games:</Typography>

        {sortedFavorites.length === 0 ? (
          <Alert
            severity="info"
            sx={{ mt: 2, width: { xs: "100%", md: "50%" } }}
          >
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                There are no favorites yet. Explore our games{" "}
                <PanToolAltIcon sx={{ transform: "rotate(90deg)" }} />
              </Typography>
              <Tooltip title="Go ti catalog">
                <Link to="/">
                  <IconButton
                    size="small"
                    sx={{ border: "1px solid" }}
                    color="Text.primary"
                  >
                    <SportsEsportsIcon />
                  </IconButton>
                </Link>
              </Tooltip>
            </Box>
          </Alert>
        ) : (
          <List sx={{ mt: 2 }}>
            {sortedFavorites.map((game) => (
              <ListItem
                key={game.id}
                disableGutters
                sx={{ mb: 2, display: "flex", alignItems: "center", position: "relative" }}
              >
                <CardFavoriteItem key={game.id} favorite={game} />

              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
}

export default ProfilePage;
