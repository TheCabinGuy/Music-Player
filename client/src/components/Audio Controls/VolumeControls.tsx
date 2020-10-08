import React, { ReactElement } from "react";
import { Grid, IconButton, Slider } from "@material-ui/core";
import { VolumeDown, VolumeMute, VolumeOff, VolumeUp } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

interface VolumeControlsProps {
  onToggleMute: () => void;
  onChange: (val: number) => void;
  volume: number;
  muted?: boolean;
}

const useStyles = makeStyles(() => ({
  icon: {
    height: "40px",
    width: "40px"
  }
}));

const VolumeControls = ({
  onToggleMute,
  muted,
  volume,
  onChange
}: VolumeControlsProps): ReactElement => {
  const styles = useStyles();
  return (
    <Grid container spacing={2} justify="center" alignItems="center">
      <Grid item>
        <IconButton color="secondary" onClick={onToggleMute}>
          {muted ? (
            <VolumeOff className={styles.icon} />
          ) : (
            <>
              {volume === 0 && <VolumeMute className={styles.icon} />}
              {volume > 0 && volume < 0.5 && <VolumeDown className={styles.icon} />}
              {volume >= 0.5 && <VolumeUp className={styles.icon} />}
            </>
          )}
        </IconButton>
      </Grid>

      <Grid item xs>
        <Slider
          color="secondary"
          aria-labelledby="continuous-slider"
          step={0.01}
          disabled={muted}
          value={volume}
          max={1}
          min={0}
          onChange={(e, value) => {
            if (typeof value === "number") {
              onChange(value);
            }
          }}
        />
      </Grid>
    </Grid>
  );
};

export default VolumeControls;
