import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
  useTheme,
  Typography,
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
    transition: "all 0.3s",
    fontSize: "0.8rem",
    paddingTop: 4,
    paddingBottom: 2,
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
    fontWeight: 500,
    fontSize: "1.2rem",
    "&.Mui-focused": {
      color: theme.palette.primary.main,
    },
  },

  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    gap: "0.2rem",
    color: theme.palette.text.primary,
    fontWeight: 500,
    fontSize: "0.8rem",

    "& .MuiListItemIcon-root": {
      minWidth: 0,
      marginRight: "0.2rem", 
      display: "flex",
      alignItems: "center",
    },
  },

  "&:hover .MuiSelect-icon": {
    color: theme.palette.primary.main,
  },

  "& .MuiSelect-iconOpen": {
    transform: "rotate(180deg)",
  },
}));

const ElegantMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: "8px 12px",
  borderRadius: 6,
  transition: "all 0.2s ease",
  color: theme.palette.text.secondary,

  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "translateX(2px)",

    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.main,
      transform: "scale(1.1)",
    },

    "& .MuiTypography-root": {
      color: theme.palette.text.primary,
      fontWeight: 600,
    },
  },

  "& .MuiListItemIcon-root": {
    minWidth: 32,
    color: theme.palette.text.disabled,
    transition: "all 0.2s ease",
    fontSize: "0.8rem",
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

function GameOrderingSelect({ ordering = "relevance", setOrdering, disabled }) {
  const theme = useTheme();

  return (
    <ElegantFormControl variant="standard" fullWidth size="small" disabled={disabled}>
      <InputLabel id="elegant-order-label">Sort by:</InputLabel>
      <Select
        labelId="elegant-order-label"
        value={ordering}
        onChange={(e) => setOrdering(e.target.value)}
        MenuProps={{
          PaperProps: {
            sx: {
              background: theme.palette.background.paper,
              backdropFilter: "blur(12px)",
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}50`,
              boxShadow: `0 10px 30px ${
                theme.palette.mode === "light"
                  ? "rgba(0, 0, 0, 0.08)"
                  : "rgba(0, 0, 0, 0.4)"
              }`,
              mt: 1,
            },
          },
        }}
      >
        {orderingOptions.map((option) => (
          <ElegantMenuItem key={option.value} value={option.value}>
            <ListItemIcon>
              {React.cloneElement(option.icon, { fontSize: "small" })}
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography fontSize="0.8rem" fontWeight={500}>
                  {option.label}
                </Typography>
              }
            />
          </ElegantMenuItem>
        ))}
      </Select>
    </ElegantFormControl>
  );
}

export default GameOrderingSelect;
