import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
import { API_KEY } from "../utils/contants";

export interface SearchProp {
  title: string;
  type?: string;
  year?: string;
  page?: number;
  imdbID?: string;
}

const initialSeachState: SearchProp = {
  title: "Pokemon",
  type: undefined,
  year: undefined,
  page: 1,
  imdbID: undefined,
};
export interface MovieDataState {
  data: [];
  loading: boolean;
  searchProp: SearchProp;
  error: string | null;
}

const initialState: MovieDataState = {
  data: [],
  loading: false,
  error: null,
  searchProp: initialSeachState,
};

export const fetchData = createAsyncThunk(
  "movieData/fetchData",
  async (_, { getState }) => {
    const { searchProp } = (getState() as RootState).movieData;
    let request = `http://www.omdbapi.com/?apikey=${API_KEY}`;
    if (searchProp.title) {
      request += `&s=${searchProp.title}`;
    }
    if (searchProp.type) {
      request += `&type=${searchProp.type}`;
    }
    if (searchProp.year) {
      request += `&y=${searchProp.year}`;
    }
    if (searchProp.page) {
      request += `&page=${searchProp.page}`;
    }

    const response = await axios.get(request);
    console.log("response", response);
    if (response.data) {
      return response.data.Search.map((movie: any) => ({
        name: movie.Title,
        year: movie.Year,
        imdbID: movie.imdbID,
        type: movie.Type,
      }));
    } else {
      return [];
    }
  }
);

const movieDataSlice = createSlice({
  name: "movieData",
  initialState,
  reducers: {
    updateSearchProp: (state, action: PayloadAction<SearchProp>) => {
      state.searchProp = action.payload;
    },
    resetSearch: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.data = [];
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = action.payload.Error;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.error.message || "An error occurred";
      });
  },
});
export const { resetSearch, updateSearchProp } = movieDataSlice.actions;
export default movieDataSlice.reducer;
