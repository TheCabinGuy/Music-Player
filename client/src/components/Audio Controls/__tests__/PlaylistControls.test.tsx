import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PlaylistControls from "../PlaylistControls";
import { BrowserRouter } from "react-router-dom";

describe("Playlist Controls", () => {
  it("Renders correctly", () => {
    const { container } = render(
      <PlaylistControls onShuffleClick={jest.fn()} onRepeatClick={jest.fn()} repeat={"none"} />,
      {
        wrapper: BrowserRouter
      }
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it("Renders correctly with repeat", () => {
    const { container } = render(
      <PlaylistControls onShuffleClick={jest.fn()} onRepeatClick={jest.fn()} repeat={"playlist"} />,
      {
        wrapper: BrowserRouter
      }
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it("Renders correctly with repeat song", () => {
    const { container } = render(
      <PlaylistControls onShuffleClick={jest.fn()} onRepeatClick={jest.fn()} repeat={"song"} />,
      {
        wrapper: BrowserRouter
      }
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it("Renders correctly with shuffle", () => {
    const { container } = render(
      <PlaylistControls
        onShuffleClick={jest.fn()}
        onRepeatClick={jest.fn()}
        repeat={"none"}
        shuffle
      />,
      {
        wrapper: BrowserRouter
      }
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it("Shuffle button functions", () => {
    const mockShuffleFunction = jest.fn();
    const { getByTitle } = render(
      <PlaylistControls
        onShuffleClick={mockShuffleFunction}
        onRepeatClick={jest.fn()}
        repeat={"none"}
      />,
      {
        wrapper: BrowserRouter
      }
    );
    const ShuffleButton = getByTitle("Shuffle");
    userEvent.click(ShuffleButton);
    expect(mockShuffleFunction.mock.calls.length).toBe(1);
  });
  it("Repeat button functions", () => {
    const mockRepeatFunction = jest.fn();
    const { getByTitle } = render(
      <PlaylistControls
        onShuffleClick={jest.fn()}
        onRepeatClick={mockRepeatFunction}
        repeat={"none"}
      />,
      {
        wrapper: BrowserRouter
      }
    );
    const RepeatButton = getByTitle("Repeat");
    userEvent.click(RepeatButton);
    expect(mockRepeatFunction.mock.calls.length).toBe(1);
  });
  it("Queue button functions", () => {
    const { getByTitle } = render(
      <PlaylistControls onShuffleClick={jest.fn()} onRepeatClick={jest.fn()} repeat={"none"} />,
      {
        wrapper: BrowserRouter
      }
    );
    const QueueButton = getByTitle("Queue");
    userEvent.click(QueueButton);
    expect(window.location.pathname).toBe("/Queue");
  });
});
