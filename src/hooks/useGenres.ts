
import useData from "./useData";

const useGenres = () => useData<Genre>('genres');

export default useGenres;

export type Genre = FetchGenresResponse["results"][number];
type FetchGenresResponse = {
  count: number;
  next: any;
  previous: any;
  results: Array<{
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
    games: Array<{
      id: number;
      slug: string;
      name: string;
      added: number;
    }>;
  }>;
};
