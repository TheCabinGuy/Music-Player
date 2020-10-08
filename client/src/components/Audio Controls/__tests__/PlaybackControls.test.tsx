import React from "react";
import { render } from "@testing-library/react";
import PlaybackControls from "../PlaybackControls";
import userEvent from "@testing-library/user-event";

describe("Playback Controls", () => {
  it("Renders correctly", () => {
    const { container } = render(
      <PlaybackControls
        duration={1}
        currentTime={0}
        onChange={jest.fn()}
        onChangeEnd={jest.fn()}
        onNextClick={jest.fn()}
        onPlayClick={jest.fn()}
        onPrevClick={jest.fn()}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it("Renders correctly with prev disabled", () => {
    const { container } = render(
      <PlaybackControls
        duration={1}
        currentTime={0}
        onChange={jest.fn()}
        onChangeEnd={jest.fn()}
        onNextClick={jest.fn()}
        onPlayClick={jest.fn()}
        onPrevClick={jest.fn()}
        prevDisabled
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it("Renders correctly with next disabled", () => {
    const { container } = render(
      <PlaybackControls
        duration={1}
        currentTime={0}
        onChange={jest.fn()}
        onChangeEnd={jest.fn()}
        onNextClick={jest.fn()}
        onPlayClick={jest.fn()}
        onPrevClick={jest.fn()}
        nextDisabled
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it("Renders correctly with play disabled", () => {
    const { container } = render(
      <PlaybackControls
        duration={1}
        currentTime={0}
        onChange={jest.fn()}
        onChangeEnd={jest.fn()}
        onNextClick={jest.fn()}
        onPlayClick={jest.fn()}
        onPrevClick={jest.fn()}
        playDisabled
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it("Previous button functions", () => {
    const mockPrevFunction = jest.fn();
    const { getByTitle } = render(
      <PlaybackControls
        duration={1}
        currentTime={0}
        onChange={jest.fn()}
        onChangeEnd={jest.fn()}
        onNextClick={jest.fn()}
        onPlayClick={jest.fn()}
        onPrevClick={mockPrevFunction}
      />
    );
    const PrevButton = getByTitle("Previous");
    userEvent.click(PrevButton);
    expect(mockPrevFunction.mock.calls.length).toBe(1);
  });
  it("Next button functions", () => {
    const mockNextFunction = jest.fn();
    const { getByTitle } = render(
      <PlaybackControls
        duration={1}
        currentTime={0}
        onChange={jest.fn()}
        onChangeEnd={jest.fn()}
        onNextClick={mockNextFunction}
        onPlayClick={jest.fn()}
        onPrevClick={jest.fn()}
      />
    );
    const NextButton = getByTitle("Next");
    userEvent.click(NextButton);
    expect(mockNextFunction.mock.calls.length).toBe(1);
  });
  it("Play button functions", () => {
    const mockPlayFunction = jest.fn();
    const { getByTitle } = render(
      <PlaybackControls
        duration={1}
        currentTime={0}
        onChange={jest.fn()}
        onChangeEnd={jest.fn()}
        onNextClick={jest.fn()}
        onPlayClick={mockPlayFunction}
        onPrevClick={jest.fn()}
      />
    );
    const PlayButton = getByTitle("Play");
    userEvent.click(PlayButton);
    expect(mockPlayFunction.mock.calls.length).toBe(1);
  });
});
