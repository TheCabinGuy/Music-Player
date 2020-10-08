import React from "react";
import { AudioControls } from "../AudioControls";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("Audio Controls", () => {
  it("Renders correctly", () => {
    const { container } = render(
      <AudioControls
        currentTime={0}
        repeat="none"
        currentSongNumber={0}
        nextSong={jest.fn()}
        duration={10}
        prevSong={jest.fn()}
        toggleSongPlaying={jest.fn()}
        setCurrentTime={jest.fn()}
        volume={5}
        setVolume={jest.fn()}
        toggleMute={jest.fn()}
        toggleSeeking={jest.fn()}
        toggleShuffle={jest.fn()}
        rotateRepeat={jest.fn()}
      />,
      {
        wrapper: BrowserRouter
      }
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
