import React, { ReactElement } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import PlaylistDialog from "../Playlist Dialog";

interface SongOptionsProps {
  songId: string;
}

const SongOptions = ({ songId }: SongOptionsProps): ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [playlistDialog, showPlaylistDialog] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const openPlaylistDialog = (): void => {
    showPlaylistDialog(true);
  };

  const closePlaylistDialog = (): void => {
    showPlaylistDialog(false);
  };

  return (
    <>
      <IconButton aria-controls="menu" aria-haspopup="true" onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={(): void => {
            handleClose();
            openPlaylistDialog();
          }}
        >
          Add to Playlist
        </MenuItem>
      </Menu>
      <PlaylistDialog onClose={closePlaylistDialog} open={playlistDialog} songId={songId} />
    </>
  );
};

export default SongOptions;
