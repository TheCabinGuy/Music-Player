import React from "react";
import SongOptions from "../SongOptions";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import slice from "../../../store/slice";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Song Options", () => {
  const Wrapper: React.FC = ({ children }) => (
    <Provider store={configureStore({ reducer: slice.reducer })}>{children}</Provider>
  );
  it("Renders correctly", () => {
    const { container } = render(<SongOptions songId="Song1" />, {
      wrapper: Wrapper
    });
    expect(container.firstChild).toMatchSnapshot();
  });
  it("Menu Opens", () => {
    const { baseElement, getByRole } = render(<SongOptions songId="Song1" />, {
      wrapper: Wrapper
    });
    const Button = getByRole("button");
    userEvent.click(Button);
    expect(baseElement).toMatchSnapshot();
  });
});
