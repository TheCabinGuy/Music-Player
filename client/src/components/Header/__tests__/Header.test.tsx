import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "../Header";
import { BrowserRouter } from "react-router-dom";

describe("Header", () => {
  it("Renders correctly", () => {
    const { container } = render(<Header title="Music Player" onSideMenuClick={jest.fn()} />);
    expect(container.firstChild).toMatchSnapshot();
  });
  it("Renders with side menu open", () => {
    const { container } = render(
      <Header title="Music Player" onSideMenuClick={jest.fn()} isSideMenuOpen />,
      {
        wrapper: BrowserRouter
      }
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it("Renders with song title", () => {
    const { container } = render(
      <Header title="Music Player" onSideMenuClick={jest.fn()} songTitle="Song name here" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it("Renders with song progress", () => {
    const { container } = render(
      <Header title="Music Player" onSideMenuClick={jest.fn()} songProgress={50} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it("Side menu button functions", () => {
    const mockSideMenuFunction = jest.fn();
    const { getAllByRole } = render(
      <Header title="Music Player" onSideMenuClick={mockSideMenuFunction} />
    );
    const QueueButton = getAllByRole("button")[0];
    userEvent.click(QueueButton);
    expect(mockSideMenuFunction.mock.calls.length).toBe(1);
  });
});
