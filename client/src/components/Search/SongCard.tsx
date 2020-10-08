import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { PlayArrow, Pause } from "@material-ui/icons";
import SongOptions from "../Song Options";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      width: 151
    },
    details: {
      display: "flex",
      flexDirection: "column"
    },
    content: {
      flex: "1 0 auto"
    },
    topContainer: {
      position: "relative"
    },
    bottomContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    cover: {
      width: 151,
      height: 151
    },
    controls: {
      position: "absolute",
      bottom: 0,
      right: 0
    },
    playIcon: {
      height: 38,
      width: 38,
      color: "black",
      border: "1px solid white",
      backgroundColor: "white",
      borderRadius: "19px"
    }
  })
);

interface SongCardProps {
  title: string;
  artist?: string;
  img: string;
  id: string;
  onClick: (id: string) => void;
  isPlaying?: boolean;
  hideSongOptions?: boolean;
}

const SongCard = ({
  title,
  artist = "",
  img,
  id,
  onClick,
  isPlaying,
  hideSongOptions = false
}: SongCardProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.topContainer}>
        <CardMedia className={classes.cover} image={img} title={`${title} album cover`} />
        <div className={classes.controls}>
          <IconButton aria-label="play/pause" onClick={() => onClick(id)}>
            {isPlaying ? (
              <Pause className={classes.playIcon} />
            ) : (
              <PlayArrow className={classes.playIcon} />
            )}
          </IconButton>
        </div>
      </div>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5" noWrap title={title}>
            {title}
          </Typography>
          <div className={classes.bottomContainer}>
            <Typography variant="subtitle1" color="textSecondary" noWrap align="right">
              {artist}
            </Typography>
            {!hideSongOptions && <SongOptions songId={id} />}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default SongCard;
