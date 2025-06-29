import { useQuery } from "@tanstack/react-query";
import { fetchPlatforms } from "../../api/games";
import BrowseLayout from "../../components/browse/BrowseLayout";
import CardBrowse from "../../components/browse/CardBrowse";

import {
  FaPlaystation,
  FaXbox,
  FaWindows,
  FaApple,
  FaAndroid,
  FaLinux,
  FaGlobe,
  FaGamepad,
} from "react-icons/fa";
import {
  SiNintendo,
  SiAtari,
  SiSega,
  SiIos,
  SiMacos,
  SiWebassembly,
  SiWii,
  SiNintendogamecube,
} from "react-icons/si";
import { LuGamepad } from "react-icons/lu";
import { GiGamepadCross } from "react-icons/gi";

function getPlatformIcon(name) {
  if (!name) return null;
  name = name.toLowerCase();

  if (name === "pc" || name.includes("pc")) return FaWindows;
  if (name.includes("playstation")) return FaPlaystation;
  if (name.includes("ps")) return FaPlaystation;
  if (name.includes("xbox")) return FaXbox;
  if (name.includes("nintendo")) return SiNintendo;
  if (name.includes("nes")) return SiNintendo;
  if (name.includes("ios")) return SiIos;
  if (name.includes("macos") || name.includes("apple macintosh"))
    return FaApple;
  if (name.includes("android")) return FaAndroid;
  if (name.includes("linux")) return FaLinux;
  if (name.includes("web")) return FaGlobe;
  if (name.includes("atari")) return SiAtari;
  if (name.includes("sega")) return SiSega;
  if (name.includes("commodore") || name.includes("amiga")) return FaGamepad;
  if (name.includes("classic macintosh")) return SiMacos;
  if (name.includes("3do")) return FaGamepad;
  if (name.includes("neo geo")) return GiGamepadCross;
  if (name.includes("webassembly")) return SiWebassembly;
  if (name.includes("wii")) return SiWii;
  if (name.includes("gamecube")) return SiNintendogamecube;
  if (name.includes("game boy")) return LuGamepad;
  if (name.includes("apple")) return FaApple;

  return null; // nessuna icona trovata
}

const PlatformPage = () => {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const { data, isLoading, error } = useQuery({
    queryKey: ["platforms"],
    queryFn: fetchPlatforms,
    staleTime: Infinity,
  });

  const renderPlatformCard = (platform) => {
    /*
    |-----------------------------------------------------
    | Data
    |-----------------------------------------------------   
    */

    const Icon = getPlatformIcon(platform.name);

    /*
    |-----------------------------------------------------
    | Return
    |-----------------------------------------------------
    */

    return (
      <CardBrowse
        key={platform.id}
        title={platform.name}
        count={platform.games_count}
        items={platform.games}
        image={platform.image_background}
        icon={Icon}
      />
    );
  };

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  return (
    <BrowseLayout
      title="All Platforms"
      data={data || []}
      isLoading={isLoading}
      error={error}
      renderItem={renderPlatformCard}
    />
  );
};

export default PlatformPage;
