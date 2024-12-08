import React, { useCallback, useMemo, useRef } from "react";
import { IMovieTableData } from "./movie-table.type";
import { cn } from "../../lib/utils";
import { debounce } from "lodash";
import Input from "../input";
import Dropdown from "../dropdown";
import Loader from "../loader";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchData,
  resetSearch,
  updateSearchProp,
} from "../../redux/data-slice";
import { useNavigate } from "react-router-dom";

const MovieTable = () => {
  const navigate = useNavigate();

  const options = [
    { value: "movie", label: "Movies" },
    { value: "series", label: "TV series" },
    { value: "episode", label: "TV series episodes" },
  ];

  const typeString = {
    movie: "Movies",
    series: "TV series",
    episode: "TV series episodes",
  };
  const dispatch = useAppDispatch();
  const { data, loading, searchProp, totalResults } = useAppSelector(
    (state) => state.movieData
  );
  const tableData: IMovieTableData[] = useMemo(() => {
    return data as IMovieTableData[];
  }, [data]);

  const [currentPage, setCurrentPage] = React.useState(1);
  const debouncedOnTitleChange = useRef(
    debounce(() => {
      dispatch(fetchData());
    }, 300)
  ).current;

  const handleTitleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedOnTitleChange();

      dispatch(
        updateSearchProp({
          ...searchProp,
          title: e.target.value,
        })
      );
    },
    [debouncedOnTitleChange, dispatch, searchProp]
  );

  const debouncedOnYearChange = useRef(
    debounce(() => {
      dispatch(fetchData());
    }, 300)
  ).current;

  const handleYearInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedOnYearChange();

      dispatch(
        updateSearchProp({
          ...searchProp,
          year: e.target.value,
        })
      );
    },
    [debouncedOnYearChange, dispatch, searchProp]
  );

  const totalPages = useMemo(() => {
    return Math.ceil(totalResults / 10);
  }, [totalResults]);

  const pageNumbers = useMemo(() => {
    const range = 1;
    const pages = [];
    pages.push(1);
    if (totalPages > 1) pages.push(totalPages);
    for (
      let i = Math.max(2, currentPage - range);
      i <= Math.min(totalPages - 1, currentPage + range);
      i++
    ) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    return pages.sort((a, b) => a - b);
  }, [currentPage, totalPages]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(
      updateSearchProp({
        ...searchProp,
        page: page,
      })
    );
    dispatch(fetchData());
  };

  const onTypeChange = (value: string) => {
    if (value === searchProp.type) {
      dispatch(
        updateSearchProp({
          ...searchProp,
          type: undefined,
        })
      );

      return;
    } else {
      dispatch(
        updateSearchProp({
          ...searchProp,
          type: value,
        })
      );
    }
    dispatch(fetchData());
  };

  const renderPagination = () => {
    return (
      <div className="flex justify-center items-center space-x-1 sm:space-x-2 mt-4 p-1 sm:p-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "sm:px-4 py-2 px-2 rounded-lg text-sm",
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-lavendar text-white hover:bg-deep"
          )}
        >
          {"<"}
        </button>

        {pageNumbers.map((page, index) => {
          const prevPage = index > 0 ? pageNumbers[index - 1] : null;
          const showEllipsisBefore = prevPage && page - prevPage > 1;

          return (
            <React.Fragment key={page}>
              {showEllipsisBefore && <span className="px-2">...</span>}
              <button
                onClick={() => onPageChange(page)}
                className={cn(
                  "sm:px-4 py-2 px-2 rounded-lg text-sm",
                  page === currentPage
                    ? "bg-deep text-white"
                    : "bg-lavendar text-white hover:bg-light-lavendar"
                )}
              >
                {page}
              </button>
            </React.Fragment>
          );
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            "sm:px-4 py-2 px-2 rounded-lg text-sm",
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-lavendar text-white hover:bg-deep"
          )}
        >
          {">"}
        </button>
      </div>
    );
  };

  const onResetFilter = () => {
    dispatch(resetSearch());
    dispatch(fetchData());
  };

  const handleRowClick = (imdbID: string) => {
    updateSearchProp({
      ...searchProp,
      imdbID: imdbID,
    });
    navigate(`/detail/${imdbID}`);
  };

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="flex flex-col items-start gap-1 justify-start sm:flex-row sm:justify-between">
        <div className="flex flex-col items-start sm:gap-4 sm:flex-row gap-1 w-full">
          <Input
            placeholder="Title..."
            value={searchProp.title}
            onChange={handleTitleInputChange}
          />
          <Input
            placeholder="Year..."
            value={searchProp.year}
            onChange={handleYearInputChange}
          />
          <Dropdown
            placeholder="Select Type..."
            selected={
              searchProp.type
                ? options.find((item) => item.value === searchProp.type)
                : undefined
            }
            values={options}
            onChange={onTypeChange}
          />
        </div>
        <button
          className="text-white bg-lavendar hover:bg-deep focus:ring-4 focus:outline-none focus:ring-none font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full sm:w-56"
          onClick={onResetFilter}
        >
          Reset Filter
        </button>
      </div>
      <div className="rounded-lg shadow-lg overflow-hidden">
        <div className="max-h-[400px] overflow-y-scroll overflow-x-hidden sm:max-h-full sm:overflow-y-auto">
          <table className="w-full">
            <thead className="bg-lavendar border-b-2 border-deep sticky top-0 z-10">
              <tr className="text-deep text-lg sm:text-md">
                <th className="p-2 sm:px-4 sticky top-0 bg-lavendar">Name</th>
                <th className="p-2 sm:px-4 sticky top-0 bg-lavendar">Type</th>
                <th className="p-2 sm:px-4 sticky top-0 bg-lavendar">
                  Release Date
                </th>
                <th className="py-2 px-4 sticky top-0 bg-lavendar">IMDB ID</th>
              </tr>
            </thead>
            <tbody className="text-center bg-secondary-grey">
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-4">
                    <Loader />
                  </td>
                </tr>
              ) : (
                <>
                  {tableData.length > 0 ? (
                    tableData.map((movie, index) => (
                      <tr
                        key={movie.imdbID}
                        className={cn(
                          "text-md font-normal cursor-pointer hover:bg-light-lavendar transition sm:text-sm",
                          index !== tableData.length - 1 &&
                            "border-b border-deep"
                        )}
                        onClick={() => handleRowClick(movie.imdbID)}
                      >
                        <td className="py-2 px-4 text-left">{movie.name}</td>
                        <td className="py-2 px-4">
                          {typeString[movie.type as keyof typeof typeString]}
                        </td>
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
      {!loading && tableData.length > 0 && renderPagination()}
    </div>
  );
};

export default MovieTable;
