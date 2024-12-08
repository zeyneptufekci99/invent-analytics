export interface IDropdown {
  onChange: (value: string) => void;
  values: IDropdownItem[];
  selected: IDropdownItem | undefined;
  placeholder: string;
}

export interface IDropdownItem {
  value: string;
  label: string;
}
