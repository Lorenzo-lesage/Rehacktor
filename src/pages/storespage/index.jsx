import { useQuery } from "@tanstack/react-query";
import { fetchStores } from "../../api/games";
import {
  FaSteam,
  FaPlaystation,
  FaXbox,
  FaAppStoreIos,
  FaGooglePlay,
  FaWindows,
  FaApple,
  FaAmazon,
  FaGlobe,
} from "react-icons/fa";
import {
  SiEpicgames,
  SiGogdotcom,
  SiNintendo,
  SiItchdotio,
} from "react-icons/si";
import BrowseLayout from "../../components/browse/BrowseLayout";
import CardBrowse from "../../components/browse/CardBrowse";

const storeIconMap = {
  Steam: FaSteam,
  "PlayStation Store": FaPlaystation,
  "Xbox Store": FaXbox,
  "App Store": FaAppStoreIos,
  "Google Play": FaGooglePlay,
  "Epic Games": SiEpicgames,
  GOG: SiGogdotcom,
  "Nintendo Store": SiNintendo,
  "itch.io": SiItchdotio,
  Amazon: FaAmazon,
  "Apple Store": FaApple,
  "Microsoft Store": FaWindows,
  "Official Website": FaGlobe,
};

const StorePage = () => {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const { data, isLoading, error } = useQuery({
    queryKey: ["stores"],
    queryFn: fetchStores,
    staleTime: Infinity,
    cacheTime: 24 * 60 * 60 * 1000,
  });

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  const renderItem = (store) => (
    <CardBrowse
      key={store.id}
      title={store.name}
      count={store.games_count}
      items={store.games}
      image={store.image_background}
      icon={storeIconMap[store.name]}
    />
  );

  return (
    <BrowseLayout
      title="All Stores"
      data={data || []}
      isLoading={isLoading}
      error={error}
      renderItem={renderItem}
    />
  );
};

export default StorePage;
