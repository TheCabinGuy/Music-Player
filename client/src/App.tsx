import { stateType } from "./store/slice";

import AudioControls from "./components/audioControls";
import Header from "./components/header";
import MusicPlayer from "./components/musicPlayer";
import React from "react";
import SongPicture from "./components/songPicture";
import { connect } from "react-redux";
import musicArray from "./music";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { SIDE_MENU_OPTIONS } from "./components/header/Header";

interface AppType {
  currentSongNumber: number;
}

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#cbcbcb",
      main: "#494949",
      dark: "#262626",
      contrastText: "#fff",
    },
    secondary: {
      light: "#e60000",
      main: "#dbdbdb",
      dark: "#BD0000",
      contrastText: "#000",
    },
  },
});

const App = ({ currentSongNumber }: AppType) => {
  return (
    <Router>
      <MusicPlayer src={musicArray[currentSongNumber]} />
      <ThemeProvider theme={theme}>
        <Header title="Music Player" />
        <main>
          <Switch>
            <Route path={`/${SIDE_MENU_OPTIONS.SEARCH.toLowerCase()}`}>
              <div>Memes</div>
            </Route>
            <Route path={`/${SIDE_MENU_OPTIONS.LIBRARY.toLowerCase()}`}>
              <div>Memes</div>
            </Route>
            <Route path={["/", `/${SIDE_MENU_OPTIONS.HOME.toLowerCase()}`]}>
              <SongPicture />
            </Route>
          </Switch>
          <Link to="/search">Test</Link>
          <AudioControls
            {...{
              numberOfSongs: musicArray.length,
            }}
          />
        </main>
      </ThemeProvider>
    </Router>
  );
};

const mapStateToProps = (state: stateType) => ({
  currentSongNumber: state.song.currentSong,
});

export default connect(mapStateToProps)(App);
