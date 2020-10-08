import { Container, Card, CardMedia, CardContent, Typography } from "@material-ui/core";
import SongOptions from "../Song Options";
import React, { ReactElement } from "react";
import { connect } from "react-redux";
import { StateType } from "../../store/slice";
import { makeStyles } from "@material-ui/styles";

interface SongPictureProps {
  src?: string;
  title?: string;
  id?: string;
}

const useStyles = makeStyles({
  root: {
    marginTop: 40,
    maxWidth: 500,
    margin: "auto"
  },
  media: {
    height: 500
  },
  content: {
    display: "flex",
    alignItems: "center"
  },
  title: {
    flexGrow: 1
  }
});

const SongPicture = ({ src, title, id = "" }: SongPictureProps): ReactElement => {
  const styles = useStyles();
  return (
    <Container maxWidth="md">
      <Card className={styles.root}>
        <CardMedia className={styles.media} image={src} title={title} />
        <CardContent className={styles.content}>
          <Typography className={styles.title}>{title}</Typography>
          <SongOptions songId={id} />
        </CardContent>
      </Card>
    </Container>
  );
};

const mapStateToProps = (state: StateType): SongPictureProps => ({
  src: state.currentSong.songPictureURL,
  title: state.currentSong.songName,
  id: state.currentSong._id
});

export { SongPicture };

export default connect(mapStateToProps)(SongPicture);
