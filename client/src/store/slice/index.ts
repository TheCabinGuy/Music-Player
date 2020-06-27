import { createSlice } from "@reduxjs/toolkit";

export interface stateType {
  playing: boolean;
  volume: number;
  muted: boolean;
  repeat: "none" | "song" | "playlist";
  seeking: boolean;
  sideMenuVisibility: boolean;
  song: {
    currentSong: number;
    currentTime: number;
    duration: number;
  };
}

export const REPEAT_ACTIONS: Record<string, string> = {
  NONE: "none",
  SONG: "song",
  PLAYLIST: "playlist",
};

function* cycleRepeatActions(): Generator<string> {
  while (true) {
    yield REPEAT_ACTIONS.NONE;
    yield REPEAT_ACTIONS.PLAYLIST;
    yield REPEAT_ACTIONS.SONG;
  }
}

const repeatActionsGenerator = cycleRepeatActions();

const initialState: stateType = {
  playing: false,
  volume: 0.5,
  muted: false,
  repeat: repeatActionsGenerator.next().value,
  seeking: false,
  sideMenuVisibility: false,
  song: {
    currentSong: 0,
    currentTime: 0,
    duration: 1,
  },
};

const musicPlayerSlice = createSlice({
  name: "musicPlayer",
  initialState,
  reducers: {
    nextSong: (state) => ({
      ...state,
      song: { ...state.song, currentSong: state.song.currentSong + 1 },
    }),
    prevSong: (state) => ({
      ...state,
      song: { ...state.song, currentSong: state.song.currentSong - 1 },
    }),
    toggleSongPlaying: (state) => ({ ...state, playing: !state.playing }),
    setVolume: (state, { payload }) => ({ ...state, volume: payload }),
    toggleMute: (state) => ({ ...state, muted: !state.muted }),
    rotateRepeat: (state) => ({
      ...state,
      repeat: repeatActionsGenerator.next().value,
    }),
    setCurrentTime: (state, { payload }) => ({
      ...state,
      song: { ...state.song, currentTime: payload },
    }),
    setDuration: (state, { payload }) => ({
      ...state,
      song: { ...state.song, duration: payload },
    }),
    toggleSeeking: (state) => ({ ...state, seeking: !state.seeking }),
    setSideMenuVisibility: (state, { payload }) => ({
      ...state,
      sideMenuVisibility: !!payload,
    }),
  },
});

export const {
  nextSong,
  prevSong,
  toggleSongPlaying,
  setVolume,
  toggleMute,
  rotateRepeat,
  setCurrentTime,
  setDuration,
  toggleSeeking,
  setSideMenuVisibility,
} = musicPlayerSlice.actions;

export default musicPlayerSlice;
