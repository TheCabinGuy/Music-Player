import { Container, Grid, IconButton, Slider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Pause,
  PlayArrow,
  SkipNext,
  SkipPrevious,
  VolumeDown,
  VolumeMute,
  VolumeOff,
  VolumeUp,
  Shuffle,
  Repeat,
  RepeatOne,
} from "@material-ui/icons";
import {
  nextSong,
  prevSong,
  setVolume,
  stateType,
  toggleMute,
  toggleSongPlaying,
  rotateRepeat,
  setCurrentTime,
  toggleSeeking,
} from "../../store/slice";

import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";
import React from "react";
import { connect } from "react-redux";
import { REPEAT_ACTIONS } from "../../store/slice";

interface AudioControls {
  prevSong: () => void;
  nextSong: () => void;
  toggleSongPlaying: () => void;
  currentSongNumber: number;
  numberOfSongs: number;
  volume: number;
  muted: boolean;
  toggleMute: () => void;
  setVolume: ActionCreatorWithPayload<number | number[], string>;
  setCurrentTime: ActionCreatorWithPayload<number>;
  playing: boolean;
  rotateRepeat: ActionCreatorWithoutPayload;
  toggleSeeking: ActionCreatorWithoutPayload;
  repeat: "none" | "song" | "playlist";
  currentTime: number;
  duration: number;
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    left: "0px",
    right: "0px",
    bottom: "0px",
    padding: "10px",
    backgroundColor: theme.palette.primary.dark,
  },
  icon: {
    height: "40px",
    width: "40px",
  },
}));

const AudioControls = ({
  prevSong,
  nextSong,
  currentSongNumber,
  numberOfSongs,
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
}: AudioControls) => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Container>
        <Grid container justify="space-around" alignItems="center">
          <Grid item xs={12} md={3}>
            <Grid container spacing={2} justify="center" alignItems="center">
              <IconButton color="secondary" onClick={() => toggleMute()}>
                <Grid item>
                  {muted ? (
                    <VolumeOff className={styles.icon} />
                  ) : (
                    <>
                      {volume === 0 && <VolumeMute className={styles.icon} />}
                      {volume > 0 && volume < 50 && (
                        <VolumeDown className={styles.icon} />
                      )}
                      {volume >= 50 && <VolumeUp className={styles.icon} />}
                    </>
                  )}
                </Grid>
              </IconButton>

              <Grid item xs>
                <Slider
                  color="secondary"
                  aria-labelledby="continuous-slider"
                  step={0.01}
                  disabled={muted}
                  value={volume}
                  max={1}
                  min={0}
                  onChange={(e, value) => setVolume(value)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={3}>
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
            >
              <Slider
                color="secondary"
                marks={[
                  {
                    value: 0,
                    label: new Date(currentTime * 1000)
                      .toISOString()
                      .substr(14, 5),
                  },
                  {
                    value: duration,
                    label: new Date(duration * 1000)
                      .toISOString()
                      .substr(14, 5),
                  },
                ]}
                max={duration}
                onChangeCommitted={(e, value) => {
                  if (typeof value === "number") {
                    toggleSeeking();
                    setCurrentTime(value);
                  }
                }}
                value={currentTime}
              />
              <Grid item>
                <IconButton
                  color="secondary"
                  onClick={() => prevSong()}
                  disabled={currentSongNumber <= 0}
                >
                  <SkipPrevious className={styles.icon} />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  color="secondary"
                  onClick={() => toggleSongPlaying()}
                >
                  {!playing && <PlayArrow className={styles.icon} />}
                  {playing && <Pause className={styles.icon} />}
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  color="secondary"
                  onClick={() => nextSong()}
                  disabled={currentSongNumber === numberOfSongs - 1}
                >
                  <SkipNext className={styles.icon} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={3}>
            <Grid container justify="flex-end">
              <IconButton color="secondary">
                <Shuffle color={"secondary"} className={styles.icon} />
              </IconButton>
              <IconButton color="secondary" onClick={() => rotateRepeat()}>
                {repeat === REPEAT_ACTIONS.NONE && (
                  <Repeat color={"secondary"} className={styles.icon} />
                )}
                {repeat === REPEAT_ACTIONS.PLAYLIST && (
                  <Repeat color={"secondary"} className={styles.icon} />
                )}
                {repeat === REPEAT_ACTIONS.SONG && (
                  <RepeatOne color={"secondary"} className={styles.icon} />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const mapStateToProps = (state: stateType) => ({
  currentSongNumber: state.song.currentSong,
  playing: state.playing,
  volume: state.volume,
  muted: state.muted,
  repeat: state.repeat,
  currentTime: state.song.currentTime,
  duration: state.song.duration,
});

const mapDispatchToProps = {
  nextSong,
  prevSong,
  toggleSongPlaying,
  toggleMute,
  setVolume,
  rotateRepeat,
  setCurrentTime,
  toggleSeeking,
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioControls);
