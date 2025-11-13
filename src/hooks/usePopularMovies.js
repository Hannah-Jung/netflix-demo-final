import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchPopularMovies = () => {
  return api.get(`/movie/popular`);
};

export const usePopularMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-popular"],
    queryFn: fetchPopularMovies,
    select: (result) => result.data,
  });
};

const fetchMovieGenreList = () => {
  return api.get(`/genre/movie/list`);
};

export const useMovieGenreListQuery = () => {
  return useQuery({
    queryKey: ["movie-genre"],
    queryFn: fetchMovieGenreList,
    select: (result) => result.data.genres,
  });
};

const fetchTopRatedMovies = () => {
  return api.get(`/movie/top_rated`);
};

export const useTopRatedMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-toprated"],
    queryFn: fetchTopRatedMovies,
    select: (result) => result.data,
  });
};

const fetchNowPlayingMovies = () => {
  return api.get(`/movie/now_playing`);
};

export const useNowPlayingMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-nowplaying"],
    queryFn: fetchNowPlayingMovies,
    select: (result) => result.data,
  });
};

const fetchUpcomingMovies = () => {
  return api.get(`/movie/upcoming`);
};

export const useUpcomingMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-upcoming"],
    queryFn: fetchUpcomingMovies,
    select: (result) => result.data,
  });
};

const fetchMovieDetails = (movieId) => {
  return api.get(`/movie/${movieId}`, {
    params: { append_to_response: "release_dates" },
  });
};

export const useMovieDetailsQuery = (movieId) => {
  return useQuery({
    queryKey: ["movie-details", movieId],
    queryFn: () => fetchMovieDetails(movieId),
    select: (result) => result.data,
    enabled: !!movieId,
  });
};

const fetchMovieReviews = (movieId) => {
  return api.get(`/movie/${movieId}/reviews`);
};

export const useMovieReviewsQuery = (movieId) => {
  return useQuery({
    queryKey: ["movie-reviews", movieId],
    queryFn: () => fetchMovieReviews(movieId),
    select: (result) => {
      return result.data.results.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    },
    enabled: !!movieId,
  });
};

const fetchMovieRecommendations = (movieId) => {
  return api.get(`/movie/${movieId}/recommendations`);
};

export const useMovieRecommendationsQuery = (movieId) => {
  return useQuery({
    queryKey: ["movie-recommendations", movieId],
    queryFn: () => fetchMovieRecommendations(movieId),
    select: (result) => result.data.results,
    enabled: !!movieId,
  });
};

const fetchMovieVideos = (movieId) => {
  return api.get(`/movie/${movieId}/videos`);
};

export const useMovieVideosQuery = (movieId) => {
  return useQuery({
    queryKey: ["movie-videos", movieId],
    queryFn: () => fetchMovieVideos(movieId),
    select: (result) => result.data.results,
    enabled: !!movieId,
  });
};

const fetchMovieDirector = (movieId) => {
  return api.get(`/movie/${movieId}/credits`);
};

export const useMovieDirectorQuery = (movieId) => {
  return useQuery({
    queryKey: ["movie-director", movieId],
    queryFn: () => fetchMovieDirector(movieId),
    select: (result) => {
      const director = result.data.crew.find(
        (member) => member.job === "Director"
      );
      return director ? director.name : "Not available";
    },
    enabled: !!movieId,
  });
};

const fetchMovieCredits = (movieId) => {
  return api.get(`/movie/${movieId}/credits`);
};

export const useMovieCreditsQuery = (movieId) => {
  return useQuery({
    queryKey: ["movie-credits", movieId],
    queryFn: () => fetchMovieCredits(movieId),
    select: (result) =>
      result.data.cast.map((castMember) => ({
        name: castMember.name,
        character: castMember.character,
        profilePath: castMember.profile_path,
      })),
    enabled: !!movieId,
  });
};

const fetchMovieImagesQuery = (movieId) => {
  return api.get(`/movie/${movieId}/images`);
};

export const useMovieImagesQuery = (movieId) => {
  return useQuery({
    queryKey: ["movie-images", movieId],
    queryFn: () => fetchMovieImagesQuery(movieId),
    select: (result) => result.data,
    enabled: !!movieId,
  });
};
