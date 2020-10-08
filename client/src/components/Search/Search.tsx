import React from "react";
import { connect } from "react-redux";
import { Autocomplete } from "@material-ui/lab";
import { Container, Grid, TextField } from "@material-ui/core";
import { songType, StateType, TOGGLE_SONG_BY_ID } from "../../store/slice";
import SongCard from "./SongCard";
import searchFunction from "./SearchFunction";

interface SearchProps {
  songs?: Array<songType>;
  onPlaySong: (id: string) => void;
  currentSongId?: string;
  isPlaying?: boolean;
}

const Search = ({ songs = [], onPlaySong, currentSongId, isPlaying = false }: SearchProps) => {
  const [searchValue, updateSearchValue] = React.useState("");
  const [filteredSongs, changeFilteredSongs] = React.useState(songs);

  React.useEffect(() => {
    changeFilteredSongs(searchFunction(songs, searchValue));
  }, [searchValue, songs]);

  return (
    <Container>
      <Autocomplete
        id="search-box"
        freeSolo
        disableClearable
        options={songs.map(song => song.songName)}
        inputValue={searchValue}
        onInputChange={(e, newValue) => updateSearchValue(newValue)}
        renderInput={params => (
          <TextField
            {...params}
            label="Search Songs"
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: "search" }}
          />
        )}
      />
      <Grid container spacing={2}>
        {filteredSongs.map(song => (
          <Grid item key={song._id}>
            <SongCard
              title={song.songName}
              artist={song.artist}
              img={song.songPictureURL}
              id={song._id}
              onClick={onPlaySong}
              isPlaying={song._id === currentSongId && isPlaying}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state: StateType) => ({
  songs: state.response.songs,
  currentSongId: state.currentSong._id,
  isPlaying: state.playing
});

const mapDispatchToProps = {
  onPlaySong: TOGGLE_SONG_BY_ID
};

export { Search };

export default connect(mapStateToProps, mapDispatchToProps)(Search);
