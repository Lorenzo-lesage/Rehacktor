import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SortIcon from "@mui/icons-material/Sort";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import StarIcon from "@mui/icons-material/Star";
import BarChartIcon from "@mui/icons-material/BarChart";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const ElegantFormControl = styled(FormControl)(({ theme }) => ({
  "& .MuiInputBase-root": {
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", 

    "&:before": {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    "&:hover:not(.Mui-disabled):before": {
      borderBottomColor: theme.palette.text.primary,
    },
    "&.Mui-focused:after": {
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
  },

  "& .MuiInputLabel-root": {
    color: theme.palette.text.secondary,
    fontWeight: 600,
    "&.Mui-focused": {
      color: theme.palette.primary.main,
    },
  },

  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.primary,
    fontWeight: 500,
    paddingLeft: "1rem",
    fontSize: "0.5rem", 
    minHeight: "32px", 
    lineHeight: "1.2", 
  },

  "& .MuiSelect-icon": {
    color: theme.palette.text.secondary,
    transition: "transform 0.2s ease",
    fontSize: "0.1rem",
  },

  "&:hover .MuiSelect-icon": {
    color: theme.palette.primary.main,
  },
}));

const ElegantMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: "12px 16px",
  margin: "2px 8px",
  borderRadius: 8,
  transition: "all 0.2s ease",
  color: theme.palette.text.secondary,

  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "translateX(4px)",

    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.main,
      transform: "scale(1.1)",
    },

    "& .MuiListItemText-primary": {
      color: theme.palette.text.primary,
      fontWeight: 600,
    },
  },

  "& .MuiListItemIcon-root": {
    minWidth: 36,
    color: theme.palette.text.disabled,
    transition: "all 0.2s ease",
  },

  "& .MuiListItemText-primary": {
    fontSize: "0.9rem",
    fontWeight: 500,
    transition: "all 0.2s ease",
  },
}));

const orderingOptions = [
  {
    value: "relevance",
    label: "Relevance",
    icon: <SortIcon fontSize="small" />,
  },
  {
    value: "-released",
    label: "Release Date (Newest)",
    icon: <CalendarTodayIcon fontSize="small" />,
  },
  {
    value: "released",
    label: "Release Date (Oldest)",
    icon: <CalendarTodayIcon fontSize="small" />,
  },
  {
    value: "-rating",
    label: "Average Rating",
    icon: <StarIcon fontSize="small" />,
  },
  {
    value: "-metacritic",
    label: "Metacritic Score",
    icon: <BarChartIcon fontSize="small" />,
  },
  {
    value: "name",
    label: "Name (A-Z)",
    icon: <ArrowUpwardIcon fontSize="small" />,
  },
  {
    value: "-name",
    label: "Name (Z-A)",
    icon: <ArrowDownwardIcon fontSize="small" />,
  },
];

function GameOrderingSelect({ ordering = "relevance", setOrdering }) {
  const theme = useTheme();

  return (
    <ElegantFormControl variant="standard" fullWidth>
      <InputLabel id="elegant-order-label">Sort by</InputLabel>
      <Select
        labelId="elegant-order-label"
        value={ordering}
        label="Sort by"
        onChange={(e) => setOrdering(e.target.value)}
        MenuProps={{
          PaperProps: {
            sx: {
              background: theme.palette.background.paper,
              backdropFilter: "blur(20px)",
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}80`,
              boxShadow: `0 20px 60px ${
                theme.palette.mode === "light"
                  ? "rgba(0, 0, 0, 0.12)"
                  : "rgba(0, 0, 0, 0.4)"
              }`,
              mt: 1,
            },
          },
        }}
      >
        {orderingOptions.map((option) => (
          <ElegantMenuItem key={option.value} value={option.value}>
            <ListItemIcon>{option.icon}</ListItemIcon>
            <ListItemText primary={option.label} />
          </ElegantMenuItem>
        ))}
      </Select>
    </ElegantFormControl>
  );
}

export default GameOrderingSelect;
