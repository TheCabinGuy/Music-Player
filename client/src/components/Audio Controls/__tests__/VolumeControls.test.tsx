import React from "react";
import { render } from "@testing-library/react";
import VolumeControls from "../VolumeControls";
import userEvent from "@testing-library/user-event";

describe("Volume Controls", () => {
  it("Renders correctly", () => {
    const { container } = render(
      <VolumeControls onToggleMute={jest.fn()} onChange={jest.fn()} volume={0.1} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it("Renders correctly while muted", () => {
    const { container } = render(
      <VolumeControls onToggleMute={jest.fn()} onChange={jest.fn()} volume={0.1} muted />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it("Renders correctly with 0% volume", () => {
    const { container } = render(
      <VolumeControls onToggleMute={jest.fn()} onChange={jest.fn()} volume={0} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it("Renders correctly with 0 - 49% volume", () => {
    const { container } = render(
      <VolumeControls onToggleMute={jest.fn()} onChange={jest.fn()} volume={0.3} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it("Renders correctly with 50 - 100% volume", () => {
    const { container } = render(
      <VolumeControls onToggleMute={jest.fn()} onChange={jest.fn()} volume={0.7} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  it("Mute button functions", () => {
    const mockMuteFunction = jest.fn();
    const { getByRole } = render(
      <VolumeControls onToggleMute={mockMuteFunction} onChange={jest.fn()} volume={0.7} />
    );
    const MuteButton = getByRole("button");
    userEvent.click(MuteButton);
    expect(mockMuteFunction.mock.calls.length).toBe(1);
  });
});
