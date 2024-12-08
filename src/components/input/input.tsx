import React from "react";
import { IInput } from "./input.type";

export const Input = ({ onChange, ...props }: IInput) => {
  return (
    <input
      className="sm:w-52 w-full h-10 p-2 border text-base border-secondary-grey focus:border-deep focus-visible:border-deep rounded-md placeholder:text-slate-600"
      type="text"
      onChange={onChange}
      {...props}
    />
  );
};
