import { Box, Tooltip } from "@mui/material";
import { FaStar } from "react-icons/fa";

function MetacriticScore({ score }) {
  if (!score) return null;
  return (
    <Tooltip title={`Metacritic Score: ${score}`} placement="left">
      <Box
        display="flex"
        alignItems="center"
        gap={0.5}
        color="yellow"
        sx={{
          color: "yellow",
          filter: "drop-shadow(3px 3px 3px rgba(0,0,0))",
          textShadow: "1px 1px 2px rgba(0,0,0)",
        }}
      >
        <FaStar size={15}  />
        <span>{score}</span>
      </Box>
    </Tooltip>
  );
}

export default MetacriticScore;
