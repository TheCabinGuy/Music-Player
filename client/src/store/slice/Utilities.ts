import { songType } from "./index";

export const configurePlaylist = (songs: Array<songType>, songIds: Array<string>) =>
  songs
    .filter(({ _id }) => songIds.includes(_id))
    .sort((a, b) => songIds.indexOf(a._id) - songIds.indexOf(b._id)) || [];

export const shuffle = (a: Array<any>) => {
  const tempArray = [...a];
  for (let i = tempArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tempArray[i], tempArray[j]] = [tempArray[j], tempArray[i]];
  }
  return tempArray;
};
