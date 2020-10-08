import searchFunction from "../SearchFunction";
import { songType } from "../../../store/slice";

describe("Search Function", () => {
  test("Basic Test", () => {
    const songs: Array<songType> = [
      { _id: "Song1", songName: "AAA", songPictureURL: "", songAudioURL: "" },
      { _id: "Song2", songName: "BBB", songPictureURL: "", songAudioURL: "" },
      { _id: "Song3", songName: "ABA", songPictureURL: "", songAudioURL: "" },
      { _id: "Song4", songName: "ACA", songPictureURL: "", songAudioURL: "" }
    ];
    expect(searchFunction(songs, "A")).toStrictEqual([
      { _id: "Song1", songName: "AAA", songPictureURL: "", songAudioURL: "" },
      { _id: "Song3", songName: "ABA", songPictureURL: "", songAudioURL: "" },
      { _id: "Song4", songName: "ACA", songPictureURL: "", songAudioURL: "" }
    ]);
  });
});
