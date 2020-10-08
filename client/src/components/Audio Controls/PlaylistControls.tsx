import React from "react";
import { Grid, IconButton } from "@material-ui/core";
import { PlaylistPlay, Repeat, RepeatOne, Shuffle } from "@material-ui/icons";
import { REPEAT_ACTIONS } from "../../store/slice";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

interface PlaylistControlsProps {
  onShuffleClick: () => void;
  onRepeatClick: () => void;
  shuffle?: boolean;
  repeat: "none" | "song" | "playlist";
}

const useStyles = makeStyles(() => ({
  icon: {
    height: "40px",
    width: "40px"
  }
}));

const PlaylistControls = ({
  onShuffleClick,
  onRepeatClick,
  shuffle,
  repeat
}: PlaylistControlsProps) => {
  const styles = useStyles();
  return (
    <Grid container justify="flex-end">
      <IconButton color="secondary" onClick={onShuffleClick} title="Shuffle">
        <Shuffle style={shuffle ? { color: "#E60000" } : {}} className={styles.icon} />
      </IconButton>
      <IconButton
        style={{ color: "#E60000" }}
        color="secondary"
        onClick={onRepeatClick}
        title="Repeat"
      >
        {repeat === REPEAT_ACTIONS.NONE && <Repeat color="secondary" className={styles.icon} />}
        {repeat === REPEAT_ACTIONS.PLAYLIST && <Repeat className={styles.icon} />}
        {repeat === REPEAT_ACTIONS.SONG && <RepeatOne className={styles.icon} />}
      </IconButton>
      <Link to="/Queue" title="Queue">
        <IconButton color="secondary">
          <PlaylistPlay className={styles.icon} />
        </IconButton>
      </Link>
    </Grid>
  );
};

export default PlaylistControls;
