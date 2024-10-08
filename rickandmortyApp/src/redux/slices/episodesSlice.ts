import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
//import type { PayloadAction } from "@reduxjs/toolkit";

type Episode = {
  id: string;
  name: string;
  episode: string;
  airDate: string;
};

export const episodesAdaptors = createEntityAdapter<Episode>();

export const episodesSelectors = episodesAdaptors.getSelectors(
  (state: { episodes: ReturnType<typeof episodesAdaptors.getInitialState> }) =>
    state.episodes
);

export const fetchEpisodes = createAsyncThunk(
  "fetchEpisodes",
  async (page: number) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/episode?page=${page}`
    );
    const data = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const episodes: Episode[] = data.results.map((ep: any) => ({
      //Burası çokemelli
      id: ep.id,
      name: ep.name,
      episode: ep.episode,
      airDate: ep.air_date,
    }));
    return { episodes, page };
  }
);

const initialState = episodesAdaptors.getInitialState({
  currentPage: 1,
});

export const episodesSlice = createSlice({
  name: "episodes",
  initialState,
  reducers: {
    incrementPage: (state) => {
      state.currentPage += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEpisodes.fulfilled, (state, action) => {
      episodesAdaptors.setMany(state, action.payload.episodes);
    });
  },
});

export const { incrementPage } = episodesSlice.actions;
export default episodesSlice.reducer;
