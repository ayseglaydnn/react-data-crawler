import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CrawlerLogDto } from '../../../types/CrawlerTypes';

interface CrawlerLiveState {
  logs: CrawlerLogDto[];
}

const initialState: CrawlerLiveState = {
  logs: [],
};

const crawlerLiveSlice = createSlice({
  name: 'crawlerLive',
  initialState,
  reducers: {
    addLog: (state, action: PayloadAction<CrawlerLogDto>) => {
      state.logs.push(action.payload);
    },
  },
});

export const { addLog } = crawlerLiveSlice.actions;
export default crawlerLiveSlice.reducer;