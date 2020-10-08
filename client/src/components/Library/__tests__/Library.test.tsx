import React from "react";
import { Library } from "../Library";
import { render } from "@testing-library/react";
import { albumType, playlistType } from "../../../store/slice";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import slice from "../../../store/slice";
import userEvent from "@testing-library/user-event";

describe("Library", () => {
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
  const albums: Array<albumType> = [
    {
      _id: "Playlist1",
      albumName: "My Songs",
      albumPicture: "picture.com",
      songIds: ["Song1", "Song2"]
    },
    {
      _id: "Playlist2",
      albumName: "My Other Songs",
      albumPicture: "picture.com",
      songIds: ["Song4", "Song5"]
    }
  ];
  it("Renders correctly", () => {
    const { container } = render(
      <Library
        playlists={playlists}
        onPlaylistClick={jest.fn()}
        albums={albums}
        onAlbumClick={jest.fn()}
      />,
      {
        wrapper: Wrapper
      }
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it("Playlist button functions", () => {
    const mockPlaylistFunction = jest.fn();
    const { getAllByRole } = render(
      <Library
        playlists={playlists}
        onPlaylistClick={mockPlaylistFunction}
        albums={albums}
        onAlbumClick={jest.fn()}
      />,
      {
        wrapper: Wrapper
      }
    );
    const PlaylistButton = getAllByRole("button")[1];
    userEvent.click(PlaylistButton);
    expect(mockPlaylistFunction.mock.calls.length).toBe(1);
  });
  it("Create playlist button functions", () => {
    const { container, getAllByRole } = render(
      <Library
        playlists={playlists}
        onPlaylistClick={jest.fn()}
        albums={albums}
        onAlbumClick={jest.fn()}
      />,
      {
        wrapper: Wrapper
      }
    );
    const CreatePlaylistButton = getAllByRole("button")[0];
    userEvent.click(CreatePlaylistButton);
    expect(container.firstChild).toMatchSnapshot();
  });
});
