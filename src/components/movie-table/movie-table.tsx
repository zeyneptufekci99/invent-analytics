import React, { useCallback } from "react";
import { IMovieTable } from "./movie-table.type";
import { cn } from "../../lib/utils";

import { debounce } from "lodash";
import Input from "../input";
import Dropdown from "../dropdown";
import Loader from "../loader";

const MovieTable = ({
  movies,
  searchString,
  onChangeTitleInput,
  isLoading,
  onYearChange,
  year,
  onTypeChange,
  options,
  selected,
  onClickButton,
  handleRowClick,
}: IMovieTable) => {
  const debouncedOnTitleChange = useCallback(
    debounce((value: string) => {
      onChangeTitleInput(value);
    }, 300),
    [onChangeTitleInput]
  );

  const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedOnTitleChange(e.target.value);
  };

  const debouncedOnYearChange = useCallback(
    debounce((value: string) => {
      onYearChange(value);
    }, 300),
    [onYearChange]
  );

  const handleYearInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedOnYearChange(e.target.value);
  };

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="flex flex-col items-start gap-1 justify-start sm:flex-row  sm:justify-between">
        <div className="flex flex-col items-start sm:gap-4 sm:flex-row gap-1 w-full">
          <Input
            placeholder="Title..."
            value={searchString}
            onChange={handleTitleInputChange}
          />

          <Input
            placeholder="Year..."
            value={year}
            onChange={handleYearInputChange}
          />

          <Dropdown
            placeholder="Select Type..."
            selected={selected}
            values={options}
            onChange={onTypeChange}
          />
        </div>
        <button
          className="text-white bg-lavendar hover:bg-deep focus:ring-4 focus:outline-none focus:ring-none font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full sm:w-fit"
          onClick={onClickButton}
        >
          Reset Filter
        </button>
      </div>

      <div className="overflow-hidden rounded-lg shadow-lg">
        <table className="w-full rounded-lg">
          <thead className="bg-lavendar border-b-2 border-deep">
            <tr className="text-deep text-lg sm:text-md">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Type</th>
              <th className="py-2 px-4">Release Date</th>
              <th className="py-2 px-4">IMDB ID</th>
            </tr>
          </thead>
          <tbody className="mt-4 text-center bg-secondary-grey">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="py-4">
                  <Loader />
                </td>
              </tr>
            ) : (
              <>
                {movies.length > 0 ? (
                  movies.map((movie, index) => (
                    <tr
                      key={movie.imdbID}
                      className={cn(
                        "text-md font-normal cursor-pointer hover:bg-light-lavendar transition sm:text-sm",
                        index !== movies.length - 1 && "border-b border-deep"
                      )}
                      onClick={() => handleRowClick(movie.imdbID)}
                    >
                      <td className="py-2 px-4 text-left">{movie.name}</td>
                      <td className="py-2 px-4">{movie.type}</td>
                      <td className="py-2 px-4">{movie.year}</td>
                      <td className="py-2 px-4">{movie.imdbID}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-4">
                      No movies found.
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MovieTable;
