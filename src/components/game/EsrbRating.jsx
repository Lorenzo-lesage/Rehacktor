import { Tooltip, Chip } from "@mui/material";

const esrbIcons = {
  Everyone: "E",
  Teen: "T",
  Mature: "M",
  "Everyone 10+": "E10+",
  AdultsOnly: "AO",
  "Rating Pending": "?",
};

function EsrbRating({ rating }) {
  if (!rating) return null;
  const label = esrbIcons[rating.name] || rating.name;

  return (
    <Tooltip title={`ESRB Rating: ${rating.name}`} placement="left">
      <Chip
        sx={{
          border: "yellow 2px solid",
          color: "yellow",
          fontWeight: "bold",
          borderRadius: "0.7rem",
          filter: "drop-shadow(3px 3px 3px rgba(0,0,0))",
          textShadow: "1px 1px 2px rgba(0,0,0)",
        }}
        label={label}
        size="small"
        variant="outlined"
      />
    </Tooltip>
  );
}

export default EsrbRating;
