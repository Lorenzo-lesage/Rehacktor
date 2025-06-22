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

function DeveloperIcon({
  name,
  type = "developer",
  stylePublisher,
  styleIconPublisher,
  showTooltip = true,
}) {
  const Icon = developerIconMap[name] || developerIconMap.default;
  const chipElement = (
    <Chip
      label={name}
      size="small"
      variant="outlined"
      sx={stylePublisher}
      icon={Icon && <Icon size={15} style={styleIconPublisher} />}
    />
  );

  return showTooltip ? (
    <Tooltip title={type} placement="top-start">
      {chipElement}
    </Tooltip>
  ) : (
    chipElement
  );
}

export default DeveloperIcon;
