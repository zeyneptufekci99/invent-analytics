import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IMovieTableData } from "../components/movie-table/movie-table.type";

const API_KEY = "YOUR_OMDB_API_KEY"; // Replace with your actual API key

export const fetchData = createAsyncThunk("movieData/fetchData", async () => {
  const response = await axios.get(`http://www.omdbapi.com/?s=movie`);
  return response.data.Search.map(
    (movie: any): IMovieTableData => ({
      name: movie.Title,
      releaseDate: movie.Year,
      imdbID: movie.imdbID,
    })
  );
});

export interface MovieDataState {
  data: IMovieTableData[];
  loading: boolean;
  error: string | null;
}

const initialState: MovieDataState = {
  data: [],
  loading: false,
  error: null,
};

const movieDataSlice = createSlice({
  name: "movieData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default movieDataSlice.reducer;
