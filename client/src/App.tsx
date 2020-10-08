import AudioControls from "./components/Audio Controls";
import Header from "./components/Header";
import MusicPlayer from "./components/Music Player";
import React from "react";
import SongPicture from "./components/Song Picture";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { SIDE_MENU_OPTIONS } from "./components/Header/Header";
import store from "./store";
import Search from "./components/Search/Search";
import Library from "./components/Library";
import Queue from "./components/Queue";
import { fetchAlbums, fetchPlaylists, fetchSongs } from "./store/slice/FetchFunctions";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#cbcbcb",
      main: "#494949",
      dark: "#262626",
      contrastText: "#fff"
    },
    secondary: {
      light: "#e60000",
      main: "#dbdbdb",
      dark: "#BD0000",
      contrastText: "#000"
    }
  }
});

const App: React.FC = () => {
  React.useEffect(() => {
    store.dispatch(fetchSongs());
    store.dispatch(fetchPlaylists());
    store.dispatch(fetchAlbums());
  }, []);

  return (
    <Router>
      <MusicPlayer />
      <ThemeProvider theme={theme}>
        <Header title="Music Player" />
        <main>
          <Switch>
            <Route path={`/${SIDE_MENU_OPTIONS.SEARCH.toLowerCase()}`}>
              <Search />
            </Route>
            <Route path={`/${SIDE_MENU_OPTIONS.LIBRARY.toLowerCase()}`}>
              <Library />
            </Route>
            <Route path={[`/${SIDE_MENU_OPTIONS.QUEUE.toLowerCase()}`]}>
              <Queue />
            </Route>
            <Route path={["/", `/${SIDE_MENU_OPTIONS.HOME.toLowerCase()}`]}>
              <SongPicture />
            </Route>
          </Switch>
          <AudioControls />
        </main>
      </ThemeProvider>
    </Router>
  );
};

export default App;
