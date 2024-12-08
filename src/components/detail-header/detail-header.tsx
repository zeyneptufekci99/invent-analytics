import React from "react";
import { IDetailHeader } from "./detail-header.type";

export const DetailHeader = ({
  title,
  director,
  imdbVotes,
  imdbRating,
  imageUrl,
  genre,
  duration,
  awards,
  date,
}: IDetailHeader) => {
  return (
    <div
      style={{ backgroundImage: `url(${imageUrl})` }}
      className="w-full p-6 flex flex-row items-center justify-start gap-4 bg-cover bg-center h-80 bg-lavendar sm:p-4 relative"
    >
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <img
        src={imageUrl}
        className="border border-white w-36 h-[216px]  sm:w-40 sm:h-60 z-20"
        alt="poster"
      />

      <div className="z-10 flex flex-col justify-start items-start">
        <h1 className="text-2xl sm:font-bold text-white  sm:text-7xl font-semibold">
          {title}
        </h1>

        <div className="relative z-10 text-sm text-white flex flex-col sm:flex-row sm:gap-2 sm:text-md">
          <div className="relative z-10 text-sm text-white flex flex-row sm:gap-2 gap-1 sm:text-md">
            <span className="text-sm text-white font-normal sm:text-md">
              {awards}
            </span>
            <span className="text-sm text-white font-normal sm:text-md sm:block">
              -
            </span>
            <span className="text-sm text-white font-normal sm:text-md">
              {duration}
            </span>
          </div>

          <span className="text-sm text-white font-normal sm:text-md  hidden sm:block">
            -
          </span>
          <span className="text-sm text-white font-normal sm:text-md">
            {date}
          </span>
        </div>
        <p className="relative z-10 text-sm sm:text-lg text-white flex flex-row gap-2">
          Director: <span className="text-white">{director}</span>
        </p>
        <span className="text-white text-sm sm:text-ld">{genre}</span>
        <span className="text-sm sm:text-lg text-white">{`${imdbRating}/10 out of ${imdbVotes} reviews`}</span>
      </div>
    </div>
  );
};
