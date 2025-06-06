import React from "react";
import { Tooltip, Box, Chip } from "@mui/material";
import { MdBusiness } from "react-icons/md";
import { FaIndustry, FaCodeBranch } from "react-icons/fa";

const developerIconMap = {
  Bethesda: FaIndustry,
  Ubisoft: FaIndustry,
  EA: FaIndustry,
  Nintendo: FaIndustry,
  Valve: FaCodeBranch,
  default: MdBusiness,
};

function DeveloperIcon({ name, type = "developer" }) {
  const Icon = developerIconMap[name] || developerIconMap.default;
  return (
    <Tooltip title={type} placement="top-start">
      <Chip
        label={name}
        size="small"
        variant="outlined"
        sx={{
          color: "rgba(88,166,255)",
          borderColor: "rgba(88,166,255)",
          px: 0.5,
          m: 0.2,
        }}
        icon={Icon && <Icon size={15}style={{ color: "rgba(88,166,255)" }} />}
        clickable
      />
    </Tooltip>
  );
}

export default DeveloperIcon;
