import React from "react";
import { Grid, IconButton, Slider } from "@material-ui/core";
import { Pause, PlayArrow, SkipNext, SkipPrevious } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

interface PlaybackControlsProps {
  // Time Slider Props
  onChange: (val: number) => void;
  onChangeEnd: () => void;
  currentTime: number;
  duration: number;

  // Button Controls
  onPrevClick: () => void;
  onPlayClick: () => void;
  onNextClick: () => void;
  prevDisabled?: boolean;
  playDisabled?: boolean;
  nextDisabled?: boolean;
  playing?: boolean;
}

const useStyles = makeStyles(() => ({
  icon: {
    height: "40px",
    width: "40px"
  }
}));

const PlaybackControls = ({
  onChange,
  onChangeEnd,
  currentTime,
  duration,
  onPrevClick,
  onPlayClick,
  onNextClick,
  prevDisabled,
  playDisabled,
  nextDisabled,
  playing
}: PlaybackControlsProps) => {
  const styles = useStyles();
  return (
    <Grid container direction="row" justify="space-around" alignItems="center">
      <Slider
        color="secondary"
        marks={[
          {
            value: 0,
            label: new Date(currentTime * 1000).toISOString().substr(14, 5)
          },
          {
            value: duration,
            label: new Date(duration * 1000).toISOString().substr(14, 5)
          }
        ]}
        max={duration}
        onChangeCommitted={(e, value) => {
          if (typeof value === "number") {
            onChange(value);
            onChangeEnd();
          }
        }}
        value={currentTime}
      />
      <Grid item>
        <IconButton
          color="secondary"
          onClick={() => onPrevClick()}
          disabled={prevDisabled}
          title="Previous"
        >
          <SkipPrevious className={styles.icon} />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton
          color="secondary"
          onClick={() => onPlayClick()}
          disabled={playDisabled}
          title="Play"
        >
          {!playing && <PlayArrow className={styles.icon} />}
          {playing && <Pause className={styles.icon} />}
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton
          color="secondary"
          onClick={() => onNextClick()}
          disabled={nextDisabled}
          title="Next"
        >
          <SkipNext className={styles.icon} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default PlaybackControls;
