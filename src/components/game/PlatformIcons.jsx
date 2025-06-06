import React from "react";
import { Tooltip, Box } from "@mui/material";

// Icone generiche da React Icons
import {
  FaXbox,
  FaPlaystation,
  FaWindows,
  FaApple,
  FaLinux,
  FaAndroid,
} from "react-icons/fa";
import { BsNintendoSwitch, BsGlobe } from "react-icons/bs";
import {
  SiAtari,
  SiSega,
  SiMacos,
  SiCommodore,
} from "react-icons/si";
import { MdPhoneIphone } from "react-icons/md";

// Mappa delle piattaforme → icona generica
const iconMap = {
  Xbox: FaXbox,
  PlayStation: FaPlaystation,
  Nintendo: BsNintendoSwitch,
  Atari: SiAtari,
  SEGA: SiSega,
  PC: FaWindows,
  macOS: FaApple,
  Linux: FaLinux,
  iOS: MdPhoneIphone,
  Android: FaAndroid,
  Web: BsGlobe,
  Commodore: SiCommodore,
};

// Raggruppamento di nomi piattaforme → categoria icona
const platformCategoryMap = {
  "Xbox": "Xbox",
  "Xbox One": "Xbox",
  "Xbox Series S/X": "Xbox",
  "PlayStation": "PlayStation",
  "PlayStation 2": "PlayStation",
  "PlayStation 3": "PlayStation",
  "PlayStation 4": "PlayStation",
  "PlayStation 5": "PlayStation",
  "PS Vita": "PlayStation",
  "PSP": "PlayStation",
  "Nintendo Switch": "Nintendo",
  "Nintendo 3DS": "Nintendo",
  "Nintendo DS": "Nintendo",
  "Nintendo DSi": "Nintendo",
  "Wii": "Nintendo",
  "Wii U": "Nintendo",
  "GameCube": "Nintendo",
  "NES": "Nintendo",
  "SNES": "Nintendo",
  "Game Boy": "Nintendo",
  "Game Boy Advance": "Nintendo",
  "Atari 2600": "Atari",
  "Atari 5200": "Atari",
  "Atari 7800": "Atari",
  "Atari Jaguar": "Atari",
  "Atari Lynx": "Atari",
  "Atari Flashback": "Atari",
  "SEGA": "SEGA",
  "PC": "PC",
  "macOS": "macOS",
  "Classic Macintosh": "macOS",
  "Apple Macintosh": "macOS",
  "Linux": "Linux",
  "Commodore / Amiga": "Commodore",
  "iOS": "iOS",
  "Android": "Android",
  "Browser": "Web",
  "Web": "Web",
};

function PlatformIcons({ platforms }) {
  if (!platforms) return null;

  const shown = new Set();

  return (
    <Box display="flex">
      {platforms.map(({ platform }) => {
        const category = platformCategoryMap[platform.name];
        const Icon = iconMap[category];

        if (!category || !Icon || shown.has(category)) return null;

        shown.add(category);

        return (
          <Tooltip key={category} title={category} placement="top">
            <Icon fontSize="small" style={{ color: "yellow", marginRight: 4 }} />
          </Tooltip>
        );
      })}
    </Box>
  );
}

export default PlatformIcons;
