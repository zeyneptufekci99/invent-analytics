import React from "react";
import { IDropdown } from "./dropdown.type";
import { cn } from "lib/utils";

export const Dropdown = ({
  onChange,
  values,
  selected,
  placeholder,
}: IDropdown) => {
  return (
    <div className="relative sm:w-fit w-full">
      <select
        className={cn(
          "appearance-none sm:w-52 w-full h-10 p-2 border border-secondary-grey text-base focus:border-deep focus-visible:border-deep rounded-md",
          selected === undefined && "text-slate-600 "
        )}
        onChange={(e) => onChange(e.target.value)}
        value={selected?.value ?? ""}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {values.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};
