import { songType } from "../../store/slice";

export default (songs: Array<songType>, filterValue: string) =>
  songs.filter(song =>
    [song.songName].some(a => a.toLowerCase().includes(filterValue.toLowerCase()))
  );
