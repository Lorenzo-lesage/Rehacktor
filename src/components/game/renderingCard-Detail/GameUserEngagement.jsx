import { Box, Typography } from "@mui/material";
import { FaUserPlus } from "react-icons/fa";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import DownloadIcon from "@mui/icons-material/Download";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CancelIcon from "@mui/icons-material/Cancel";

function GameUserEngagement({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <Box sx={{ my: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <FaUserPlus />
          User Engagement Overview
        </Typography>
        <Typography color="text.secondary">No data available</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <FaUserPlus />
        User Engagement Overview
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", mb: 0.5 }}>
        <SportsEsportsIcon
          color="text.primary"
          sx={{ mr: 1 }}
          fontSize={"small"}
        />
        <strong style={{ marginRight: 5 }}>Currently Playing:</strong>
        <Typography>
          {data.playing} users are actively playing this game.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", mb: 0.5 }}>
        <DownloadIcon color="text.primary" sx={{ mr: 1 }} fontSize={"small"} />
        <strong style={{ marginRight: 5 }}>Owned but Not Started:</strong>
        <Typography>
          {data.owned} users own this game but haven’t started it yet.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", mb: 0.5 }}>
        <CheckCircleIcon color="success" sx={{ mr: 1 }} fontSize={"small"} />
        <strong style={{ marginRight: 5 }}>Completed:</strong>
        <Typography>{data.beaten} users have completed the game.</Typography>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", mb: 0.5 }}>
        <PlaylistAddIcon
          color="text.primary"
          sx={{ mr: 1 }}
          fontSize={"small"}
        />
        <strong style={{ marginRight: 5 }}>In Wishlist:</strong>
        <Typography>
          {data.toplay} users have added the game to their wishlist.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", mb: 0.5 }}>
        <HourglassEmptyIcon color="warning" sx={{ mr: 1 }} fontSize={"small"} />
        <strong style={{ marginRight: 5 }}>Yet to Play:</strong>
        <Typography>
          {data.yet} users own the game but haven't played it yet.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", mb: 0.5 }}>
        <CancelIcon color="error" sx={{ mr: 1 }} fontSize={"small"} />
        <strong style={{ marginRight: 5 }}>Dropped:</strong>
        <Typography>{data.dropped} users have abandoned the game.</Typography>
      </Box>
    </Box>
  );
}

export default GameUserEngagement;
