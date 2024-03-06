import { useEffect, useState } from "react";
import getCount from "../components/gg";

const useGames = ()=> {
  const [games, setGames] = useState<Game []>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    console.log("useEffect", getCount(), games);
    const controller = new AbortController();

    setLoading(true);
    (async () => {
      const fetchGame = await fetch(
        "https://api.rawg.io/api/games?key=481d5ccab6394e1d88e9853405c7a39a&dates=2020-09-01,2024-01-01&platforms=18,1,7",
        { method: "get", signal: controller.signal },
      );
      
      if (!fetchGame.ok) {
        setError(`error, status: ${fetchGame.status}`);
        setLoading(false);
        return;
      }
      const { results } = (await fetchGame.json()) as FetchGameResponse;
      setGames(results);
      setLoading(false);
    })();
    return () => controller.abort();
  }, []);
  return {games, error, isLoading}
}

export default useGames;
export type Game = FetchGameResponse['results'][number];
export type Platform = Game['platforms'][number]['platform']

type FetchGameResponse = {
    count: number;
    next: string;
    previous: any;
    results: Array<{
      slug: string;
      name: string;
      playtime: number;
      platforms: Array<{
        platform: {
          id: number;
          name: string;
          slug: string;
        };
      }>;
      stores: Array<{
        store: {
          id: number;
          name: string;
          slug: string;
        };
      }>;
      released: string;
      tba: boolean;
      background_image: string;
      rating: number;
      rating_top: number;
      ratings: Array<{
        id: number;
        title: string;
        count: number;
        percent: number;
      }>;
      ratings_count: number;
      reviews_text_count: number;
      added: number;
      added_by_status: {
        yet: number;
        owned: number;
        beaten: number;
        toplay: number;
        dropped: number;
        playing: number;
      };
      metacritic?: number;
      suggestions_count: number;
      updated: string;
      id: number;
      score: any;
      clip: any;
      tags: Array<{
        id: number;
        name: string;
        slug: string;
        language: string;
        games_count: number;
        image_background: string;
      }>;
      esrb_rating?: {
        id: number;
        name: string;
        slug: string;
        name_en: string;
        name_ru: string;
      };
      user_game: any;
      reviews_count: number;
      saturated_color: string;
      dominant_color: string;
      short_screenshots: Array<{
        id: number;
        image: string;
      }>;
      parent_platforms: Array<{
        platform: {
          id: number;
          name: string;
          slug: string;
        };
      }>;
      genres: Array<{
        id: number;
        name: string;
        slug: string;
      }>;
    }>;
    user_platforms: boolean;
  };