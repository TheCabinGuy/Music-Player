import React from "react";
import { Search } from "../Search";
import { render } from "@testing-library/react";
import slice, { songType } from "../../../store/slice";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

describe("Search", () => {
  const Wrapper: React.FC = ({ children }) => (
    <Provider store={configureStore({ reducer: slice.reducer })}>{children}</Provider>
  );
  const songs: Array<songType> = [
    {
      _id: "Song1",
      songName: "Song 1",
      songAudioURL: "somewhereelse.com/song",
      songPictureURL: "somewhereelse.com/picture"
    },
    {
      _id: "Song2",
      songName: "Song 2",
      songAudioURL: "somewhereelse.com/song2",
      songPictureURL: "somewhereelse.com/picture2"
    }
  ];
  it("Renders correctly", () => {
    const { container } = render(<Search onPlaySong={jest.fn()} songs={songs} />, {
      wrapper: Wrapper
    });
    expect(container.firstChild).toMatchSnapshot();
  });
});
