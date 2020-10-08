import { createSlice } from "@reduxjs/toolkit";
import { configurePlaylist, shuffle } from "./Utilities";

export type songType = {
  _id: string;
  songName: string;
  artist?: string;
  songPictureURL: string;
  songAudioURL: string;
};

export type albumType = {
  _id: string;
  albumName: string;
  albumPicture: string;
  songIds: Array<string>;
};

export type playlistType = {
  _id: string;
  playlistName: string;
  songIds: Array<string>;
};

export interface StateType {
  playing: boolean;
  volume: number;
  muted: boolean;
  repeat: "none" | "song" | "playlist";
  seeking: boolean;
  sideMenuVisibility: boolean;
  currentPlaylist?: playlistType;
  currentSong: {
    currentSongNumber: number;
    currentTime: number;
    duration: number;
    songAudioURL?: string;
    songPictureURL?: string;
    songName?: string;
    _id?: string;
  };
  shuffle: boolean;
  songs: Array<songType>;
  loading?: boolean;
  response: { songs?: Array<songType>; playlists?: Array<playlistType>; albums?: Array<albumType> };
  error?: {
    songs?: string;
    playlists?: string;
    albums?: string;
  };
}

export const REPEAT_ACTIONS: Record<string, string> = {
  NONE: "none",
  SONG: "song",
  PLAYLIST: "playlist"
};

function* cycleRepeatActions(): Generator<string> {
  while (true) {
    yield REPEAT_ACTIONS.NONE;
    yield REPEAT_ACTIONS.PLAYLIST;
    yield REPEAT_ACTIONS.SONG;
  }
}

const repeatActionsGenerator = cycleRepeatActions();

const initialState: StateType = {
  playing: false,
  volume: 0.5,
  muted: false,
  repeat: repeatActionsGenerator.next().value,
  seeking: false,
  sideMenuVisibility: false,
  currentSong: {
    currentSongNumber: 0,
    currentTime: 0,
    duration: 1
  },
  songs: [],
  shuffle: false,
  response: {}
};

const musicPlayerSlice = createSlice({
  name: "@MUSIC_PLAYER",
  initialState,
  reducers: {
    FETCH_MUSIC_REQUEST: (state): StateType => ({ ...state, loading: true }),
    FETCH_MUSIC_SUCCESS: (state, { payload }) => {
      const songs: Array<songType> = payload.map((song: songType) => ({
        ...song,
        songAudioURL: `${process.env.REACT_APP_API_URL}${song.songAudioURL}`,
        songPictureURL: `${process.env.REACT_APP_API_URL}${song.songPictureURL}`
      }));
      return {
        ...state,
        loading: false,
        currentSong: {
          ...state.currentSong,
          ...(songs?.[0] || {}),
          currentSongNumber: 0
        },
        response: {
          ...state.response,
          songs: songs
        },
        songs: songs,
        error: {}
      };
    },
    FETCH_MUSIC_FAILURE: (state, { payload }) => ({
      ...state,
      loading: false,
      currentSong: initialState.currentSong,
      songs: [],
      error: { ...state.error, songs: payload }
    }),
    FETCH_PLAYLIST_REQUEST: state => ({ ...state, loading: true }),
    FETCH_PLAYLIST_SUCCESS: (state, { payload }) => ({
      ...state,
      loading: false,
      response: {
        ...state.response,
        playlists: payload
      },
      error: {}
    }),
    FETCH_PLAYLIST_FAILURE: (state, { payload }) => ({
      ...state,
      loading: false,
      error: { ...state.error, playlists: payload }
    }),
    FETCH_ALBUM_REQUEST: state => ({ ...state, loading: true }),
    FETCH_ALBUM_SUCCESS: (state, { payload }) => {
      const albums: Array<albumType> = payload.map((album: albumType) => ({
        ...album,
        albumPicture: `${process.env.REACT_APP_API_URL}${album.albumPicture}`
      }));
      return {
        ...state,
        loading: false,
        response: {
          ...state.response,
          albums: albums
        },
        error: {}
      };
    },
    FETCH_ALBUM_FAILURE: (state, { payload }) => ({
      ...state,
      loading: false,
      error: { ...state.error, albums: payload }
    }),
    ADD_PLAYLIST_REQUEST: state => ({ ...state, loading: true }),
    ADD_PLAYLIST_SUCCESS: state => ({
      ...state,
      loading: false,
      error: {}
    }),
    ADD_PLAYLIST_FAILURE: (state, { payload }) => ({
      ...state,
      loading: false,
      error: { ...state.error, playlists: payload }
    }),
    UPDATE_PLAYLIST_REQUEST: state => ({ ...state, loading: true }),
    UPDATE_PLAYLIST_SUCCESS: state => ({
      ...state,
      loading: false,
      error: {}
    }),
    UPDATE_PLAYLIST_FAILURE: (state, { payload }) => ({
      ...state,
      loading: false,
      error: { ...state.error, playlists: payload }
    }),
    NEXT_SONG: state => {
      const newSongIndex = state.currentSong.currentSongNumber + 1;
      return newSongIndex === state.songs.length
        ? state
        : {
            ...state,
            playing: true,
            currentSong: {
              ...state.currentSong,
              ...state.songs[newSongIndex],
              currentSongNumber: newSongIndex
            }
          };
    },
    PREV_SONG: state => {
      const newSongIndex = state.currentSong.currentSongNumber - 1;
      if (newSongIndex === -1) return state;
      return {
        ...state,
        playing: true,
        currentSong: {
          ...state.currentSong,
          ...state.songs[newSongIndex],
          currentSongNumber: newSongIndex
        }
      };
    },
    TOGGLE_SONG_BY_ID: (state, { payload }) => {
      const songInCurrentPlaylist = state.songs.some(({ _id }) => payload === _id);
      const songsToSearch: Array<songType> =
        (songInCurrentPlaylist ? state.songs : state.response.songs) || [];
      return {
        ...state,
        playing: !(payload === state.currentSong._id) || !state.playing,
        currentSong: {
          ...state.currentSong,
          ...songsToSearch.find(({ _id }) => _id === payload),
          currentSongNumber: songsToSearch.findIndex(({ _id }) => _id === payload) || 0
        },
        songs: songsToSearch,
        currentPlaylist: songInCurrentPlaylist ? state.currentPlaylist : undefined
      };
    },
    ROTATE_REPEAT: state => ({
      ...state,
      repeat: repeatActionsGenerator.next().value
    }),
    SET_CURRENT_TIME: (state, { payload }) => ({
      ...state,
      currentSong: { ...state.currentSong, currentTime: payload }
    }),
    SET_DURATION: (state, { payload }) => ({
      ...state,
      currentSong: { ...state.currentSong, duration: payload }
    }),
    SET_SIDE_MENU_VISIBILITY: (state, { payload }) => ({
      ...state,
      sideMenuVisibility: !!payload
    }),
    SET_VOLUME: (state, { payload }) => ({ ...state, volume: payload }),
    TOGGLE_MUTE: state => ({ ...state, muted: !state.muted }),
    TOGGLE_SEEKING: state => ({ ...state, seeking: !state.seeking }),
    TOGGLE_SHUFFLE: state => {
      const shuffledSongs: Array<songType> = !state.shuffle
        ? shuffle(state.songs)
        : state.currentPlaylist?.songIds
        ? configurePlaylist(state.response.songs || [], state.currentPlaylist?.songIds)
        : state.response.songs || [];
      return {
        ...state,
        shuffle: !state.shuffle,
        songs: shuffledSongs,
        currentSong: {
          ...state.currentSong,
          currentSongNumber: shuffledSongs.findIndex(song => song._id === state.currentSong._id)
        }
      };
    },
    TOGGLE_SONG_PLAYING: state => ({ ...state, playing: !state.playing }),
    USE_PLAYLIST: (state, { payload }) => {
      const selectedPlaylist = state.response.playlists?.find(({ _id }) => _id === payload);
      if (!selectedPlaylist) {
        return state;
      }
      const songs: Array<songType> = configurePlaylist(
        state.response.songs || [],
        selectedPlaylist.songIds
      );
      return {
        ...state,
        playing: true,
        currentPlaylist: selectedPlaylist,
        songs: songs,
        currentSong: {
          ...songs[0],
          currentSongNumber: 0,
          currentTime: 0,
          duration: state.currentSong.duration
        }
      };
    },
    USE_ALBUM: (state, { payload }) => {
      const selectedAlbum: albumType | undefined = state.response.albums?.find(
        ({ _id }) => _id === payload
      );
      if (!selectedAlbum) {
        return state;
      }
      const songs: Array<songType> = configurePlaylist(
        state.response.songs || [],
        selectedAlbum.songIds
      );
      return {
        ...state,
        playing: true,
        currentPlaylist: {
          playlistName: selectedAlbum.albumName,
          songIds: selectedAlbum.songIds,
          _id: selectedAlbum._id
        },
        songs: songs,
        currentSong: {
          ...songs[0],
          currentSongNumber: 0,
          currentTime: 0,
          duration: 1
        }
      };
    }
  }
});

export const {
  NEXT_SONG,
  PREV_SONG,
  TOGGLE_SONG_PLAYING,
  SET_VOLUME,
  TOGGLE_MUTE,
  ROTATE_REPEAT,
  SET_CURRENT_TIME,
  SET_DURATION,
  TOGGLE_SEEKING,
  SET_SIDE_MENU_VISIBILITY,
  FETCH_MUSIC_REQUEST,
  FETCH_MUSIC_SUCCESS,
  FETCH_MUSIC_FAILURE,
  FETCH_PLAYLIST_FAILURE,
  FETCH_PLAYLIST_REQUEST,
  FETCH_PLAYLIST_SUCCESS,
  FETCH_ALBUM_REQUEST,
  FETCH_ALBUM_SUCCESS,
  FETCH_ALBUM_FAILURE,
  ADD_PLAYLIST_REQUEST,
  ADD_PLAYLIST_SUCCESS,
  ADD_PLAYLIST_FAILURE,
  UPDATE_PLAYLIST_REQUEST,
  UPDATE_PLAYLIST_SUCCESS,
  UPDATE_PLAYLIST_FAILURE,
  TOGGLE_SHUFFLE,
  TOGGLE_SONG_BY_ID,
  USE_PLAYLIST,
  USE_ALBUM
} = musicPlayerSlice.actions;

export default musicPlayerSlice;
