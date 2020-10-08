import React from "react";
import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { StateType } from "../../store/slice";
import { connect } from "react-redux";
import store from "../../store";
import { addPlaylist } from "../../store/slice/FetchFunctions";

interface PlaylistCreatorProps {
  onClose: () => void;
  open: boolean;
  currentPlaylists: Array<string>;
}

const useStyles = makeStyles({
  content: {
    display: "flex"
  }
});

const PlaylistCreator = ({ onClose, open, currentPlaylists }: PlaylistCreatorProps) => {
  const styles = useStyles();

  const [newPlaylistName, changeNewPlaylistName] = React.useState("");
  const [error, updateError] = React.useState("");

  const validateInput = (value: string) => {
    if (currentPlaylists.includes(value)) {
      updateError("Name already taken");
      return false;
    }
    updateError("");
    return true;
  };

  const addNewPlaylist = () => {
    if (validateInput(newPlaylistName)) {
      store.dispatch(addPlaylist(newPlaylistName));
      onClose();
    }
  };

  return (
    <Dialog onClose={onClose} aria-labelledby="dialog-title" open={open}>
      <DialogTitle id="dialog-title">Create Playlist</DialogTitle>
      <DialogContent className={styles.content}>
        <TextField
          variant="outlined"
          error={!!error}
          helperText={error}
          title="Playlist Name"
          placeholder="New Playlist"
          value={newPlaylistName}
          onChange={e => changeNewPlaylistName(e.currentTarget.value)}
        />
        <Button variant="contained" color="secondary" onClick={addNewPlaylist}>
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = (state: StateType) => ({
  currentPlaylists: state.response.playlists?.map(({ playlistName }) => playlistName) || []
});

export { PlaylistCreator };

export default connect(mapStateToProps)(PlaylistCreator);
