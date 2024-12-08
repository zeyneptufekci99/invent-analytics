import { IDropdownItem } from "../dropdown/dropdown.type";

export interface IMovieTable {
  movies: IMovieTableData[];
  onChangeTitleInput: (value: string) => void;
  searchString: string;
  isLoading?: boolean;
  onYearChange: (value: string) => void;
  year?: string;
  onTypeChange: (value: string) => void;
  options: IDropdownItem[];
  selected: IDropdownItem | undefined;
  onClickButton: () => void;
  handleRowClick: (imdbID: string) => void;
}

export interface IMovieTableData {
  name: string;
  year: string;
  type: string;
  imdbID: string;
}
