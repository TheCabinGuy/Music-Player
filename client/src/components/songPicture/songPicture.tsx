import { Container, Paper, Card, CardMedia } from "@material-ui/core";

import React from "react";

interface SongPictureProps {}

const SongPicture = ({}: SongPictureProps) => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3}>
        <img src="https://socialnewsdaily.com/wp-content/uploads/2014/05/rick-astley-rickrolling.jpg" />
      </Paper>
    </Container>
  );
};

export default SongPicture;
