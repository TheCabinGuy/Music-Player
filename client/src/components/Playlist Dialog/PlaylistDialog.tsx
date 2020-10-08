import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import { playlistType, StateType } from "../../store/slice";
import { connect } from "react-redux";
import PlaylistCreator from "./PlaylistCreator";
import store from "../../store";
import { addSongToPlaylist } from "../../store/slice/FetchFunctions";

interface PlaylistDialogProps {
  onClose: () => void;
  open: boolean;
  playlists?: Array<playlistType>;
  songId: string;
}

const PlaylistDialog = ({ onClose, open, playlists, songId }: PlaylistDialogProps) => {
  const [playlistCreator, showPlaylistCreator] = React.useState();

  const addSongToPlaylistHandler = (playlist: playlistType) => {
    const newPlaylist: playlistType = {
      ...playlist,
      songIds: playlist.songIds.concat(songId)
    };
    store.dispatch(addSongToPlaylist(playlist._id, newPlaylist));
    onClose();
  };

  return (
    <>
      <Dialog onClose={onClose} aria-labelledby="dialog-title" open={open}>
        <DialogTitle id="dialog-title">Add to Playlist</DialogTitle>
        <DialogContent>
          <Button variant="contained" color="secondary" onClick={() => showPlaylistCreator(true)}>
            Create New Playlist
          </Button>
          {playlists && (
            <List>
              {playlists.map(playlist => (
                <ListItem
                  button
                  key={playlist._id}
                  onClick={() => addSongToPlaylistHandler(playlist)}
                >
                  <ListItemText
                    primary={playlist.playlistName}
                    secondary={`${playlist.songIds.length} Songs`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>
      <PlaylistCreator onClose={() => showPlaylistCreator(false)} open={playlistCreator} />
    </>
  );
};

const mapStateToProps = (state: StateType) => ({
  playlists: state.response.playlists
});

export { PlaylistDialog };

export default connect(mapStateToProps)(PlaylistDialog);
