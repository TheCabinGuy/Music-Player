import React from "react";
import { PlaylistCreator } from "../PlaylistCreator";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Playlist Creator", () => {
  it("Renders correctly", () => {
    const { baseElement } = render(
      <PlaylistCreator onClose={jest.fn()} open currentPlaylists={["Playlist1"]} />
    );
    expect(baseElement).toMatchSnapshot();
  });
  it("Renders correctly closed", () => {
    const { baseElement } = render(
      <PlaylistCreator onClose={jest.fn()} open={false} currentPlaylists={["Playlist1"]} />
    );
    expect(baseElement).toMatchSnapshot();
  });
  it("Can type in text box", () => {
    const { baseElement, getByPlaceholderText } = render(
      <PlaylistCreator onClose={jest.fn()} open currentPlaylists={["Playlist1"]} />
    );
    const TextBox = getByPlaceholderText("New Playlist");
    userEvent.type(TextBox, "Hello World");
    expect(baseElement).toMatchSnapshot();
  });
  it("onClose function works", () => {
    const mockCloseFunction = jest.fn();
    const { getByRole } = render(
      <PlaylistCreator onClose={mockCloseFunction} open currentPlaylists={["Playlist1"]} />
    );
    const OutsideContainer = getByRole("none");
    userEvent.click(OutsideContainer);
    expect(mockCloseFunction.mock.calls.length).toBe(1);
  });
});
