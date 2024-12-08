import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { API_KEY } from "utils/contants";

export const fetchDetailData = createAsyncThunk(
  "detailData/fetchDetailData",
  async (id: string) => {
    let request = `http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`;

    const response = await axios.get(request);
    console.log("response", response);
    if (response.data) {
      return {
        title: response.data.Title ?? "",
        director: response.data.Director ?? "",
        cast: response.data.Actors ?? "",
        imageUrl: response.data.Poster ?? "",
        genre: response.data.Genre ?? "",
        year: response.data.Year ?? "",
        imdbID: response.data.imdbID ?? "",
        type: response.data.Type ?? "",
        plot: response.data.Plot ?? "",
        releasedDate: response.data.Released ?? "",
        writer: response.data.Writer ?? "",
        imdbRating: response.data.imdbRating ?? "",
        imdbVotes: response.data.imdbVotes ?? "",
        awards: response.data.Awards ?? "",
        duration: response.data.Runtime ?? "",
      };
    } else {
      return initialMovieStates;
    }
  }
);

export interface DetailDataProps {
  title: string;
  director: string;
  cast: string;
  imageUrl: string;
  genre: string;
  year: string;
  imdbID: string;
  type: string;
  plot: string;
  releasedDate: string;
  writer: string;
  imdbRating: string;
  imdbVotes: string;
  awards: string;
  duration: string;
}

export interface MovieDataState {
  data: DetailDataProps;
  loading: boolean;
  error: string | null;
}

const initialMovieStates: DetailDataProps = {
  title: "",
  director: "",
  cast: "",
  imageUrl: "",
  genre: "",
  year: "",
  imdbID: "",
  type: "",
  plot: "",
  releasedDate: "",
  writer: "",
  imdbRating: "",
  imdbVotes: "",
  awards: "",
  duration: "",
};

const initialState: MovieDataState = {
  data: initialMovieStates,
  loading: false,
  error: null,
};

const detailDataSlice = createSlice({
  name: "detailData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetailData.pending, (state) => {
        state.data = initialMovieStates;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDetailData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchDetailData.rejected, (state, action) => {
        state.loading = false;
        state.data = initialMovieStates;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default detailDataSlice.reducer;
