import React from "react";
import { Tooltip, Box } from "@mui/material";
import {
  SiSteam,
  SiEpicgames,
  SiGogdotcom,
  SiItchdotio,
  SiNintendoswitch,
  SiPlaystation,
  SiApple,
  SiGoogleplay,
} from "react-icons/si";
import { TiVendorMicrosoft } from "react-icons/ti";
import { BsGlobe } from "react-icons/bs";

const iconMap = {
  steam: SiSteam,
  "epic-games": SiEpicgames,
  gog: SiGogdotcom,
  "itch.io": SiItchdotio,
  "xbox-store": TiVendorMicrosoft,
  "playstation-store": SiPlaystation,
  nintendo: SiNintendoswitch,
  "apple-appstore": SiApple,
  "google-play": SiGoogleplay,
  official: BsGlobe,
};

const storeUrls = {
  steam: "https://store.steampowered.com/",
  "playstation-store": "https://store.playstation.com/",
  "epic-games": "https://www.epicgames.com/store/en-US/",
  gog: "https://www.gog.com/",
  "itch.io": "https://itch.io/",
  "xbox-store": "https://www.microsoft.com/store/",
  nintendo: "https://www.nintendo.com/store/",
  "apple-appstore": "https://www.apple.com/app-store/",
  "google-play": "https://play.google.com/store",
  official: "#", // metti pure null o "#" se non hai un link ufficiale
};

function StoreIcons({ stores, styleStores, styleIconStores }) {
  if (!stores || stores.length === 0) return null;

  const shown = new Set();

  return (
    <Box display="flex" flexWrap="wrap">
      {stores.map(({ store }, index) => {
        if (!store) return null;

        const slug = store.slug;
        const Icon = iconMap[slug];
        const url = storeUrls[slug];

        if (!Icon || shown.has(slug) || !url) return null;

        shown.add(slug);

        return (
          <Tooltip key={slug + index} title={store.name} placement="top">
            <Box
              component="a"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              sx={styleStores}
            >
              <Icon fontSize="1.2em" style={styleIconStores} />
            </Box>
          </Tooltip>
        );
      })}
    </Box>
  );
}

export default StoreIcons;
