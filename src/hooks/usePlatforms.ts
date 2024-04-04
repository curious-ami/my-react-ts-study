import useData from "./useData";

const usePlatforms = () => useData<Platform>('platforms/lists/parents');

export default usePlatforms;

export type Platform = FetchPlatformsResponse["results"][number];
type FetchPlatformsResponse  = {
    count: number
    next: any
    previous: any
    results: Array<{
      id: number
      name: string
      slug: string
      platforms: Array<{
        id: number
        name: string
        slug: string
        games_count: number
        image_background: string
        image: any
        year_start?: number
        year_end: any
      }>
    }>
  }
