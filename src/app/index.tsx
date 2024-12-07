import React, { useEffect } from "react";
import { Header, MovieTable } from "../components";
import { IMovieTableData } from "../components/movie-table/movie-table.type";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchData } from "../redux/data-slice";

export const Home = () => {
  const movies: IMovieTableData[] = [
    { name: "Movie 1", releaseDate: "2020-01-01", imdbID: "tt1234567" },
    { name: "Movie 2", releaseDate: "2020-01-02", imdbID: "tt1234568" },
  ];
  // const dispatch = useAppDispatch();
  // const { data, loading, error } = useAppSelector((state) => state.movieData);

  // useEffect(() => {
  //   dispatch(fetchData());
  // }, [dispatch]);

  return (
    <div className="w-full h-full gap-6 flex flex-col items-center justify-center">
      <Header />
      <div className="w-full h-full px-4">
        <MovieTable movies={movies} />
      </div>
    </div>
  );
};
