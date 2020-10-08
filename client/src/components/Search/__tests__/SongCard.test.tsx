import React from "react";
import SongCard from "../SongCard";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import slice from "../../../store/slice";
import userEvent from "@testing-library/user-event";

describe("Song Card", () => {
  const Wrapper: React.FC = ({ children }) => (
    <Provider store={configureStore({ reducer: slice.reducer })}>{children}</Provider>
  );
  it("Renders correctly", () => {
    const { container } = render(
      <SongCard
        title={"Song"}
        artist={"Singer"}
        img={"someImage.png"}
        id={"Song1"}
        onClick={jest.fn()}
      />,
      {
        wrapper: Wrapper
      }
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it("onClick Function", () => {
    const mockOnClickFunction = jest.fn();
    const { getAllByRole } = render(
      <SongCard
        title={"Song"}
        artist={"Singer"}
        img={"someImage.png"}
        id={"Song1"}
        onClick={mockOnClickFunction}
      />,
      {
        wrapper: Wrapper
      }
    );
    const PlayButton = getAllByRole("button")[0];
    userEvent.click(PlayButton);
    expect(mockOnClickFunction.mock.calls.length).toBe(1);
  });
});
