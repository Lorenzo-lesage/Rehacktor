import React from "react";
import { Box, Tooltip } from "@mui/material";
import { FaClock } from "react-icons/fa";

function Playtime({ hours }) {
  if (!hours) return null;
  return (
    <Tooltip title={`Playtime: ${hours} hours`} placement="bottom">
      <Box
        display="flex"
        alignItems="center"
        gap={0.5}
        style={{
          color: "yellow",
          filter: "drop-shadow(3px 3px 3px rgba(0,0,0))",
          textShadow: "2px 1px 1px rgba(0,0,0)",
        }}
      >
        <FaClock size={15}  />
        <span>{hours}h</span>
      </Box>
    </Tooltip>
  );
}

export default Playtime;
