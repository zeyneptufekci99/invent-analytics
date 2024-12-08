import React, { useEffect, useMemo } from "react";
import { Header, MovieTable } from "../components";
import { IMovieTableData } from "../components/movie-table/movie-table.type";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchData, resetSearch, updateSearchProp } from "../redux/data-slice";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { data, loading, error, searchProp } = useAppSelector(
    (state) => state.movieData
  );

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const tableData: IMovieTableData[] = useMemo(() => {
    return data as IMovieTableData[];
  }, [data]);

  const onChangeTitleInput = (value: string) => {
    dispatch(
      updateSearchProp({
        ...searchProp,
        title: value,
      })
    );
    dispatch(fetchData());
  };

  const onYearChange = (value: string) => {
    dispatch(
      updateSearchProp({
        ...searchProp,
        year: value,
      })
    );
    if (value.length >= 4) {
      dispatch(fetchData());
    }
  };

  const options = [
    { value: "movie", label: "Movies" },
    { value: "series", label: "TV series" },
    { value: "episode", label: "TV series episodes" },
  ];

  const onTypeChange = (value: string) => {
    if (value === searchProp.type) {
      console.log("here");
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
    <div className="w-full h-full gap-6 flex flex-col items-center justify-center">
      <Header />
      <div className="w-full h-full px-4">
        <MovieTable
          handleRowClick={handleRowClick}
          onClickButton={onResetFilter}
          options={options}
          onTypeChange={onTypeChange}
          onYearChange={onYearChange}
          isLoading={loading}
          onChangeTitleInput={onChangeTitleInput}
          searchString={searchProp.title}
          movies={tableData}
          year={searchProp.year}
          selected={
            searchProp.type
              ? options.find((item) => item.value === searchProp.type)
              : undefined
          }
        />
      </div>
    </div>
  );
};
