import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = ({ keyword, page, genre }) => {
  const params = { page };
  if (genre) {
    params.with_genres = genre;
  }

  if (keyword && !genre) {
    params.query = keyword;
    return api.get("/search/movie", { params });
  } else {
    if (keyword && genre) {
    }
    return api.get("/discover/movie", { params });
  }
};

export const useSearchMovieQuery = ({ keyword, page, genre }) => {
  return useQuery({
    queryKey: ["movie-search", { keyword, page, genre }],
    queryFn: () => fetchSearchMovie({ keyword, page, genre }),
    select: (result) => result.data,
  });
};
