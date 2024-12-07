import React from "react";
import { IMovieTable } from "./movie-table.type";
import { cn } from "../../lib/utils";
import { useNavigate } from "react-router-dom";
const MovieTable = ({ movies }: IMovieTable) => {
  const navigate = useNavigate();

  const handleRowClick = (imdbID: string) => {
    navigate(`/movies/${imdbID}`);
  };
  return (
    <div className="overflow-hidden rounded-lg shadow-lg">
      <table className="w-full rounded-lg">
        <thead className="bg-light-lavendar">
          <tr className="text-deep text-lg">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Release Date</th>
            <th className="py-2 px-4">IMDb ID</th>
          </tr>
        </thead>
        <tbody className="mt-4 text-center bg-secondary-grey">
          {movies.length > 0 ? (
            movies.map((movie, index) => (
              <tr
                key={movie.imdbID}
                className={cn(
                  "text-sm font-normal hover:bg-gray-100 transition",
                  index !== movies.length - 1 && "border-b border-deep"
                )}
                onClick={() => handleRowClick(movie.imdbID)}
              >
                <td className="py-2 px-4">{movie.name}</td>
                <td className="py-2 px-4">{movie.releaseDate}</td>
                <td className="py-2 px-4">{movie.imdbID}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="py-4">
                No movies found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MovieTable;
