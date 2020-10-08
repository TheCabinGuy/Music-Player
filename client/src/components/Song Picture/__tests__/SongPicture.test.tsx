import React from "react";
import { SongPicture } from "../SongPicture";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import slice from "../../../store/slice";

describe("Song Picture", () => {
  const Wrapper: React.FC = ({ children }) => (
    <Provider store={configureStore({ reducer: slice.reducer })}>{children}</Provider>
  );
  it("Renders correctly", () => {
    const { container } = render(
      <SongPicture title="Song 1" id="Song 1" src="aRandomPicture.com/picture" />,
      {
        wrapper: Wrapper
      }
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
