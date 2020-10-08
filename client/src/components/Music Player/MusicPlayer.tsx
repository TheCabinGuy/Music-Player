import React, { RefObject, createRef, useEffect, useRef } from "react";

import { connect } from "react-redux";
import {
  REPEAT_ACTIONS,
  StateType,
  SET_CURRENT_TIME,
  SET_DURATION,
  TOGGLE_SEEKING,
  TOGGLE_SONG_PLAYING,
  NEXT_SONG
} from "../../store/slice";

interface MusicPlayerProps {
  src?: string;
  playing?: boolean;
  volume: number;
  muted?: boolean;
  repeat: "none" | "song" | "playlist";
  isSeeking?: boolean;
  clickedTime?: number;
  onTimeUpdate: (time: number) => void;
  onDurationChange: (duration: number) => void;
  toggleSeeking: () => void;
  toggleSongPlaying: () => void;
  onNextSong: () => void;
}

const MusicPlayer = ({
  src,
  playing = false,
  volume,
  muted,
  repeat,
  onTimeUpdate,
  onDurationChange,
  clickedTime,
  isSeeking,
  toggleSeeking,
  toggleSongPlaying,
  onNextSong
}: MusicPlayerProps) => {
  const audioRef: RefObject<HTMLAudioElement> = createRef();
  const isRendered: React.MutableRefObject<boolean> = useRef(false);

  useEffect(() => {
    if (audioRef.current && src) {
      audioRef.current.load();
    }
  }, [src]);

  useEffect(() => {
    if (
      isSeeking &&
      audioRef.current &&
      typeof clickedTime === "number" &&
      clickedTime !== audioRef.current.currentTime
    ) {
      audioRef.current.currentTime = clickedTime;
      toggleSeeking();
    }
  }, [isSeeking]);

  useEffect(() => {
    if (audioRef.current && (volume || muted)) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted, audioRef]);

  useEffect(() => {
    const localAudioRef = audioRef;
    if (isRendered.current && localAudioRef.current) {
      if (playing && localAudioRef.current.paused) {
        localAudioRef.current.play();
      } else if (!playing) {
        localAudioRef.current.pause();
      }
    }
    return () => {
      localAudioRef.current?.pause();
    };
  }, [playing, audioRef]);

  useEffect(() => {
    isRendered.current = true;
  }, []);

  const songEndActions = {
    [REPEAT_ACTIONS.NONE]: toggleSongPlaying,
    [REPEAT_ACTIONS.PLAYLIST]: onNextSong
  };

  return (
    <audio
      ref={audioRef}
      loop={repeat === REPEAT_ACTIONS.SONG}
      onTimeUpdate={event => {
        if (clickedTime !== event.currentTarget.currentTime && !isSeeking) {
          onTimeUpdate(event.currentTarget.currentTime);
        }
      }}
      onDurationChange={e => onDurationChange(e.currentTarget.duration)}
      onEnded={() => songEndActions[repeat]?.()}
    >
      {src && <source src={src} type="audio/mpeg" />}
      Audio isn&apos;t enabled on this device
    </audio>
  );
};

const mapDispatchToProps = {
  onTimeUpdate: SET_CURRENT_TIME,
  onDurationChange: SET_DURATION,
  toggleSeeking: TOGGLE_SEEKING,
  toggleSongPlaying: TOGGLE_SONG_PLAYING,
  onNextSong: NEXT_SONG
};

const mapStateToProps = (state: StateType) => ({
  currentSongNumber: state.currentSong.currentSongNumber,
  playing: state.playing,
  volume: state.volume,
  muted: state.muted,
  repeat: state.repeat,
  clickedTime: state.currentSong.currentTime,
  isSeeking: state.seeking,
  src: state.currentSong.songAudioURL
});

export { MusicPlayer };

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);
