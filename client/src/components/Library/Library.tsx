import React from "react";
import {
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@material-ui/core";
import { albumType, playlistType, StateType, USE_PLAYLIST, USE_ALBUM } from "../../store/slice";
import { connect } from "react-redux";
import PlaylistCreator from "../Playlist Dialog/PlaylistCreator";
import SongCard from "../Search/SongCard";

interface LibraryProps {
  playlists: Array<playlistType>;
  onPlaylistClick: (id: string) => void;
  albums: Array<albumType>;
  onAlbumClick: (id: string) => void;
}

const Library = ({ playlists, onPlaylistClick, albums, onAlbumClick }: LibraryProps) => {
  const [playlistCreator, showPlaylistCreator] = React.useState(false);

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography variant="h5">Playlists</Typography>
          <Button variant="contained" color="secondary" onClick={() => showPlaylistCreator(true)}>
            Create New Playlist
          </Button>
          {playlists && (
            <List>
              {playlists.map(playlist => (
                <ListItem button key={playlist._id} onClick={() => onPlaylistClick(playlist._id)}>
                  <ListItemText
                    primary={playlist.playlistName}
                    secondary={`${playlist.songIds.length} Songs`}
                  />
                </ListItem>
              ))}
            </List>
          )}
          {!playlists.length && <Typography>No Playlists Created</Typography>}
          <PlaylistCreator onClose={() => showPlaylistCreator(false)} open={playlistCreator} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5">Albums</Typography>
          <Grid container spacing={2}>
            {albums.map(album => (
              <Grid item key={album._id}>
                <SongCard
                  title={album.albumName}
                  artist={`${album.songIds.length} Songs`}
                  img={album.albumPicture}
                  id={album._id}
                  onClick={onAlbumClick}
                  hideSongOptions
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state: StateType) => ({
  playlists: state.response.playlists || [],
  albums: state.response.albums || []
});

const mapDispatchToProps = {
  onPlaylistClick: USE_PLAYLIST,
  onAlbumClick: USE_ALBUM
};

export { Library };

export default connect(mapStateToProps, mapDispatchToProps)(Library);
