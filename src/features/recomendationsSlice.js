import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  animeNews: {},
  mangaNews: {},
  bookmarks: [],
};

const recomendationsSlice = createSlice({
  name: "newsAndRecommendations",
  initialState,
  reducers: {
    getAnimeNews: (state, action) => {
      state.animeNews = action.payload;
    },
    getMangaNews: (state, action) => {
      state.mangaNews = action.payload;
    },
    saveBookmark: (state, action) => {
      state.bookmarks.push(action.payload);
    },
  },
});

export const { getAnimeNews, getMangaNews, saveBookmark } =
  recomendationsSlice.actions;
//me devuelve todos los estados, pero me ocaciona renderizados innecesarios
// export const selectRecomendations = (state) => state.newsRecommend;
export const selectAnimeNews = (state) => state.newsRecommend.animeNews;
export const selectMangaNews = (state) => state.newsRecommend.mangaNews;
export const selectBookmarks = (state) => state.newsRecommend.bookmarks;
export default recomendationsSlice.reducer;
