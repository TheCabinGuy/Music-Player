import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  NEXT_SONG,
  PREV_SONG,
  SET_VOLUME,
  StateType,
  TOGGLE_MUTE,
  TOGGLE_SONG_PLAYING,
  ROTATE_REPEAT,
  SET_CURRENT_TIME,
  TOGGLE_SEEKING,
  TOGGLE_SHUFFLE
} from "../../store/slice";
import React from "react";
import { connect } from "react-redux";
import VolumeControls from "./VolumeControls";
import PlaybackControls from "./PlaybackControls";
import PlaylistControls from "./PlaylistControls";

interface AudioControls {
  prevSong: () => void;
  nextSong: () => void;
  toggleSongPlaying: () => void;
  currentSongNumber: number;
  numberOfSongs?: number;
  volume: number;
  muted?: boolean;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  setCurrentTime: (time: number) => void;
  playing?: boolean;
  rotateRepeat: () => void;
  toggleSeeking: () => void;
  repeat: "none" | "song" | "playlist";
  currentTime: number;
  duration: number;
  toggleShuffle: () => void;
  shuffle?: boolean;
}

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    left: "0px",
    right: "0px",
    bottom: "0px",
    padding: "10px",
    backgroundColor: theme.palette.primary.dark
  },
  icon: {
    height: "40px",
    width: "40px"
  }
}));

const AudioControls = ({
  prevSong,
  nextSong,
  currentSongNumber,
  numberOfSongs = 0,
  toggleSongPlaying,
  volume,
  muted,
  toggleMute,
  setVolume,
  playing,
  rotateRepeat,
  repeat,
  currentTime,
  duration,
  setCurrentTime,
  toggleSeeking,
  toggleShuffle,
  shuffle
}: AudioControls) => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Container>
        <Grid container justify="space-around" alignItems="center">
          <Grid item xs={12} md={3}>
            <VolumeControls
              onToggleMute={() => toggleMute()}
              onChange={setVolume}
              volume={volume}
              muted={muted}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <PlaybackControls
              onChange={setCurrentTime}
              onChangeEnd={toggleSeeking}
              currentTime={currentTime}
              duration={duration}
              onPrevClick={prevSong}
              onPlayClick={toggleSongPlaying}
              onNextClick={nextSong}
              prevDisabled={currentSongNumber <= 0 || !numberOfSongs}
              playDisabled={!numberOfSongs}
              nextDisabled={currentSongNumber === numberOfSongs - 1 || !numberOfSongs}
              playing={playing}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <PlaylistControls
              onShuffleClick={() => toggleShuffle()}
              onRepeatClick={() => rotateRepeat()}
              shuffle={shuffle}
              repeat={repeat}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const mapStateToProps = (state: StateType) => ({
  currentSongNumber: state.currentSong.currentSongNumber,
  playing: state.playing,
  volume: state.volume,
  muted: state.muted,
  repeat: state.repeat,
  currentTime: state.currentSong.currentTime,
  duration: state.currentSong.duration,
  numberOfSongs: state.songs?.length,
  shuffle: state.shuffle
});

const mapDispatchToProps = {
  nextSong: NEXT_SONG,
  prevSong: PREV_SONG,
  toggleSongPlaying: TOGGLE_SONG_PLAYING,
  toggleMute: TOGGLE_MUTE,
  setVolume: SET_VOLUME,
  rotateRepeat: ROTATE_REPEAT,
  setCurrentTime: SET_CURRENT_TIME,
  toggleSeeking: TOGGLE_SEEKING,
  toggleShuffle: TOGGLE_SHUFFLE
};

export { AudioControls };

export default connect(mapStateToProps, mapDispatchToProps)(AudioControls);
