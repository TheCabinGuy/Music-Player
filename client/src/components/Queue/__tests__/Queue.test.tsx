import React from "react";
import { Queue } from "../Queue";
import { render } from "@testing-library/react";
import slice, { songType } from "../../../store/slice";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

describe("Queue", () => {
  const Wrapper: React.FC = ({ children }) => (
    <Provider store={configureStore({ reducer: slice.reducer })}>{children}</Provider>
  );
  const songs: Array<songType> = [
    {
      _id: "Song1",
      songName: "Song 1",
      songAudioURL: "somewhereelse.com/song",
      songPictureURL: "somewhereelse.com/picture"
    }
  ];
  it("Renders correctly", () => {
    const { container } = render(<Queue songs={songs} onPlaySong={jest.fn()} />, {
      wrapper: Wrapper
    });
    expect(container.firstChild).toMatchSnapshot();
  });
});
