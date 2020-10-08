import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import SongCard from "../Search/SongCard";
import { songType, StateType, TOGGLE_SONG_BY_ID } from "../../store/slice";
import { connect } from "react-redux";

interface QueueProps {
  songs: Array<songType>;
  onPlaySong: (id: string) => void;
  currentSongId?: string;
  isPlaying?: boolean;
}

const Queue = ({ songs, onPlaySong, currentSongId, isPlaying = false }: QueueProps) => {
  return (
    <Container>
      <Typography variant="h5">Queue</Typography>
      <Grid container spacing={2}>
        {songs.map(song => (
          <Grid item key={song._id}>
            <SongCard
              title={song.songName}
              artist={song.artist}
              img={song.songPictureURL}
              id={song._id}
              onClick={onPlaySong}
              isPlaying={song._id === currentSongId && isPlaying}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state: StateType) => ({
  songs: state.songs,
  currentSongId: state.currentSong._id,
  isPlaying: state.playing
});

const mapDispatchToProps = {
  onPlaySong: TOGGLE_SONG_BY_ID
};

export { Queue };

export default connect(mapStateToProps, mapDispatchToProps)(Queue);
