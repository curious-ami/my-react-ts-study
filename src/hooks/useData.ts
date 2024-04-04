import { useEffect, useState } from "react";

type Endpoint = 'genres'|'games';
type RequestConfig = {params: {
  genres: number | undefined;
}}
const useData = <T>(endpoint: Endpoint, requestConfig?: RequestConfig, deps?: any[]) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    console.log("requestConfig", requestConfig);
    console.log("deps",deps)
    const queryParams = {
      key: "481d5ccab6394e1d88e9853405c7a39a",
      dates: "2020-09-01,2024-01-01",
      platforms: "18,1,7",
      genres: requestConfig?.params.genres
    }

    setLoading(true);
    (async () => {
      const fetchGame = await fetch(
        `https://api.rawg.io/api/${endpoint}?${buildQueryParams(queryParams)}`,//${requestConfig?.params?.genres?'genres='+(String(requestConfig?.params?.genres))+'&':''}key=481d5ccab6394e1d88e9853405c7a39a&dates=2020-09-01,2024-01-01&platforms=18,1,7`,
        { method: "get", signal: controller.signal }
      );

      if (!fetchGame.ok) {
        setError(`error, status: ${fetchGame.status}`);
        setLoading(false);
        return;
      }
      const { results } = (await fetchGame.json()) as FetchResponse<T>;
      setData(results);
      setLoading(false);
    })();
    return () => controller.abort();
  }, deps? [...deps]:[]);
  return { data, error, isLoading };
};

export default useData;

function buildQueryParams(params: Record<string, string | number | boolean|undefined>): string {
  const queryParams = new URLSearchParams();

  for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
          const value = params[key];
          if (value !== undefined && value !== null) {
              queryParams.append(key, String(value));
          }
      }
  }

  return queryParams.toString();
}

type FetchResponse<T> = {results: T[]};

