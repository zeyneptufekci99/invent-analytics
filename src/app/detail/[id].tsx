import { fetchDetailData } from "../../redux/detail-slice";
import { DetailHeader, Header, Loader } from "../../components";
import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { IDetailHeader } from "@components/detail-header/detail-header.type";
import { useAppSelector } from "../../redux/hooks";

export const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data, loading, error } = useAppSelector((state) => state.detailData);

  useEffect(() => {
    dispatch(fetchDetailData(id ?? ""));
  }, [dispatch, id]);

  const detailHeaderItem: IDetailHeader = useMemo(() => {
    const item = {
      title: data.title,
      director: data.director,
      imdbVotes: data.imdbVotes,
      imdbRating: data.imdbRating,
      imageUrl: data.imageUrl,
      genre: data.genre,
      duration: data.duration,
      awards: data.awards,
      date: data.releasedDate,
    };
    return item;
  }, [data]);

  const actorList = useMemo(() => {
    const list = data.cast.split(",");
    return list;
  }, [data]);

  const writerList = useMemo(() => {
    const list = data.writer.split(",");
    return list;
  }, [data]);

  return loading ? (
    <div className="w-full h-full">
      <Loader />
    </div>
  ) : (
    <div className="w-full h-full bg-gray">
      <Header />
      <DetailHeader {...detailHeaderItem} />
      <div className="bg-secondary-grey p-4 sm:p-6">
        <p className="text-lg text-black">{data.plot} </p>
      </div>
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="bg-deep p-4 w-full">
          <p className="sm:text-xl text-lg underline text-white">Actors</p>
          {actorList.map((actor) => (
            <p className="sm:text-lg text-md text-white" key={actor}>
              {actor}
            </p>
          ))}
        </div>

        <div className="bg-deep  p-4 w-full">
          <p className="sm:text-xl text-lg  underline text-white">Writers</p>
          {writerList.map((writer) => (
            <p className="sm:text-lg text-md text-white" key={writer}>
              {writer}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
