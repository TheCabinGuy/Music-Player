import React, { RefObject, createRef, useEffect, useRef } from "react";

import { connect } from "react-redux";
import {
  REPEAT_ACTIONS,
  stateType,
  setCurrentTime,
  setDuration,
  toggleSeeking,
  toggleSongPlaying,
  nextSong,
} from "../../store/slice";
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";

interface MusicPlayerProps {
  src?: string;
  playing?: boolean;
  volume: number;
  muted: boolean;
  repeat: string;
  isSeeking: boolean;
  clickedTime: number;
  setCurrentTime: ActionCreatorWithPayload<number>;
  setDuration: ActionCreatorWithPayload<number>;
  toggleSeeking: ActionCreatorWithoutPayload;
  toggleSongPlaying: ActionCreatorWithoutPayload;
  nextSong: ActionCreatorWithoutPayload;
}

const MusicPlayer = ({
  src,
  playing = false,
  volume,
  muted,
  repeat,
  setCurrentTime,
  setDuration,
  clickedTime,
  isSeeking,
  toggleSeeking,
  toggleSongPlaying,
  nextSong,
}: MusicPlayerProps) => {
  const audioRef: RefObject<HTMLAudioElement> = createRef();
  const isRendered: React.MutableRefObject<boolean> = useRef(false);

  useEffect(() => {
    if (audioRef.current && src) {
      audioRef.current.src = src;
    }
  }, [src]);

  useEffect(() => {
    if (
      isSeeking &&
      audioRef.current &&
      clickedTime !== audioRef.current.currentTime
    ) {
      toggleSeeking();
      audioRef.current.currentTime = clickedTime;
    }
  }, [clickedTime]);

  useEffect(() => {
    if (audioRef.current && (volume || muted)) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  useEffect(() => {
    if (isRendered.current && audioRef.current) {
      if (playing) {
        audioRef.current.play();
      } else if (!playing) {
        audioRef.current.pause();
      }
    }
    return () => {
      audioRef.current?.pause();
    };
  }, [playing, audioRef]);

  useEffect(() => {
    isRendered.current = true;
  }, []);

  const songEndActions = {
    [REPEAT_ACTIONS.NONE]: toggleSongPlaying,
    [REPEAT_ACTIONS.PLAYLIST]: nextSong,
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop={repeat === REPEAT_ACTIONS.SONG}
        onTimeUpdate={(event) => {
          if (clickedTime !== event.currentTarget.currentTime)
            setCurrentTime(event.currentTarget.currentTime);
        }}
        onCanPlay={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => songEndActions[repeat]?.()}
      >
        {src && <source src={src} type="audio/mpeg" />}
        Audio isn't enabled on this device
      </audio>
    </>
  );
};

const mapDispatchToProps = {
  setCurrentTime,
  setDuration,
  toggleSeeking,
  toggleSongPlaying,
  nextSong,
};

const mapStateToProps = (state: stateType) => ({
  currentSongNumber: state.song.currentSong,
  playing: state.playing,
  volume: state.volume,
  muted: state.muted,
  repeat: state.repeat,
  clickedTime: state.song.currentTime,
  isSeeking: state.seeking,
});

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);
