import { useQuery } from '@tanstack/react-query';
import { fetchGameScreenshots } from '../api/games';

function useGameScreenshots(gameId) {
  return useQuery({
    queryKey: ['gameScreenshots', gameId],
    queryFn: () => fetchGameScreenshots(gameId),
    enabled: !!gameId,
    staleTime: 5 * 60 * 1000,
  });
}

export default useGameScreenshots;
