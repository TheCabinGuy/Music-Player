import {
  ADD_PLAYLIST_FAILURE,
  ADD_PLAYLIST_REQUEST,
  ADD_PLAYLIST_SUCCESS,
  FETCH_MUSIC_FAILURE,
  FETCH_MUSIC_REQUEST,
  FETCH_MUSIC_SUCCESS,
  FETCH_PLAYLIST_FAILURE,
  FETCH_PLAYLIST_REQUEST,
  FETCH_PLAYLIST_SUCCESS,
  playlistType,
  UPDATE_PLAYLIST_FAILURE,
  UPDATE_PLAYLIST_REQUEST,
  UPDATE_PLAYLIST_SUCCESS,
  FETCH_ALBUM_REQUEST,
  FETCH_ALBUM_SUCCESS,
  FETCH_ALBUM_FAILURE
} from "./index";

export function fetchSongs() {
  return function (dispatch: any) {
    dispatch(FETCH_MUSIC_REQUEST());
    return fetch(`${process.env.REACT_APP_API_URL}/song`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(json => {
        dispatch(FETCH_MUSIC_SUCCESS(json));
      })
      .catch(err => {
        dispatch(FETCH_MUSIC_FAILURE(`${err}`));
      });
  };
}

export function fetchPlaylists() {
  return function (dispatch: any) {
    dispatch(FETCH_PLAYLIST_REQUEST());
    return fetch(`${process.env.REACT_APP_API_URL}/playlist`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(json => {
        dispatch(FETCH_PLAYLIST_SUCCESS(json));
      })
      .catch(err => {
        dispatch(FETCH_PLAYLIST_FAILURE(`${err}`));
      });
  };
}

export function fetchAlbums() {
  return function (dispatch: any) {
    dispatch(FETCH_ALBUM_REQUEST());
    return fetch(`${process.env.REACT_APP_API_URL}/album`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(json => {
        dispatch(FETCH_ALBUM_SUCCESS(json));
      })
      .catch(err => {
        dispatch(FETCH_ALBUM_FAILURE(`${err}`));
      });
  };
}

export function addPlaylist(name: string) {
  return function (dispatch: any) {
    dispatch(ADD_PLAYLIST_REQUEST());
    return fetch(`${process.env.REACT_APP_API_URL}/playlist`, {
      method: "POST",
      body: JSON.stringify({ playlistName: name, songIds: [] }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(() => {
        dispatch(ADD_PLAYLIST_SUCCESS());
        fetchPlaylists()(dispatch);
      })
      .catch(err => {
        dispatch(ADD_PLAYLIST_FAILURE(`${err}`));
      });
  };
}

export function addSongToPlaylist(playlistId: string, body: playlistType) {
  return function (dispatch: any) {
    dispatch(UPDATE_PLAYLIST_REQUEST());
    return fetch(`${process.env.REACT_APP_API_URL}/playlist/${playlistId}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(() => {
        dispatch(UPDATE_PLAYLIST_SUCCESS());
        fetchPlaylists()(dispatch);
      })
      .catch(err => {
        dispatch(UPDATE_PLAYLIST_FAILURE(`${err}`));
      });
  };
}
