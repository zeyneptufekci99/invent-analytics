import React, { useEffect } from "react";
import { Header, MovieTable } from "../components";
import { useAppDispatch } from "../redux/hooks";
import { fetchData } from "../redux/data-slice";

export const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <div className="w-full h-full gap-6 flex flex-col items-center justify-center">
      <Header />
      <div className="w-full h-full px-4">
        <MovieTable />
      </div>
    </div>
  );
};
