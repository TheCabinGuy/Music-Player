import React from "react";
import { PlaylistDialog } from "../PlaylistDialog";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import slice, { playlistType } from "../../../store/slice";
import userEvent from "@testing-library/user-event";

describe("Playlist Dialog", () => {
  const Wrapper: React.FC = ({ children }) => (
    <Provider store={configureStore({ reducer: slice.reducer })}>{children}</Provider>
  );
  const playlists: Array<playlistType> = [
    {
      _id: "Playlist1",
      playlistName: "My Songs",
      songIds: ["Song1", "Song2"]
    },
    {
      _id: "Playlist2",
      playlistName: "My Other Songs",
      songIds: ["Song4", "Song5"]
    }
  ];
  it("Renders correctly", () => {
    const { baseElement } = render(
      <PlaylistDialog onClose={jest.fn()} open songId="Song1" playlists={playlists} />,
      {
        wrapper: Wrapper
      }
    );
    expect(baseElement).toMatchSnapshot();
  });
  it("Renders correctly closed", () => {
    const { baseElement } = render(
      <PlaylistDialog onClose={jest.fn()} open={false} songId="Song1" playlists={playlists} />,
      {
        wrapper: Wrapper
      }
    );
    expect(baseElement).toMatchSnapshot();
  });
  it("onClose function works", () => {
    const mockCloseFunction = jest.fn();
    const { getByRole } = render(
      <PlaylistDialog onClose={mockCloseFunction} open songId="Song1" playlists={playlists} />,
      {
        wrapper: Wrapper
      }
    );
    const OutsideContainer = getByRole("none");
    userEvent.click(OutsideContainer);
    expect(mockCloseFunction.mock.calls.length).toBe(1);
  });
});
