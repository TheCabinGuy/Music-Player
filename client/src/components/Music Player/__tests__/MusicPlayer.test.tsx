import React from "react";
import { MusicPlayer } from "../MusicPlayer";
import { render } from "@testing-library/react";

describe("Music Player", () => {
  it("Renders correctly", () => {
    const { container } = render(
      <MusicPlayer
        volume={0.5}
        repeat={"none"}
        onTimeUpdate={jest.fn()}
        onDurationChange={jest.fn()}
        toggleSeeking={jest.fn()}
        toggleSongPlaying={jest.fn()}
        onNextSong={jest.fn()}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
