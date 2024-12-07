export interface IMovieTable {
  movies: IMovieTableData[];
}

export interface IMovieTableData {
  name: string;
  releaseDate: string;
  imdbID: string;
}
