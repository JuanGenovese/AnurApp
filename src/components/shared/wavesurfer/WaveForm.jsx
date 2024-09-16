import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#eee",
  progressColor: "#ffc573",
  cursorColor: "#ffc573",
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 150,
  normalize: true,
  partialRender: true,
});

export default function Waveform({ frogName, setPause }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showPlayer, setShowPlayer] = useState(true);

  const tryGetAudio = () => {
    try {
      const url = require(`../../../assets/audio/${frogName}.mp3`).default;
      setShowPlayer(true);
      return url;
    } catch (error) {
      setShowPlayer(false);
      return "";
    }
  };
  useEffect(() => {
    const url = tryGetAudio();
    if (showPlayer && url) {
      setPlay(false);
      const options = formWaveSurferOptions(waveformRef.current);
      wavesurfer.current = WaveSurfer.create(options);
      wavesurfer.current.load(url);

      wavesurfer.current.on("ready", function () {
        if (wavesurfer.current) {
          wavesurfer.current.setVolume(volume);
          setVolume(volume);
        }
      });
      wavesurfer.current.on("finish", function () {
        if (wavesurfer.current) {
          const currentDuration = wavesurfer.current.getCurrentTime();
          const duration = wavesurfer.current.getDuration();
          if (currentDuration === duration) {
            setPlay(playing);
            setPause(playing);
            wavesurfer.current.stop();
          }
        }
      });
    }
  }, [frogName]);

  const handlePlayPause = () => {
    setPlay(!playing);
    setPause(!playing);

    wavesurfer.current.playPause();
  };

  return (
    <div className="col-12">
      {showPlayer ? (
        <div>
          <div className="clearfix"></div>
          <br></br>
          <div
            id="waveform"
            ref={waveformRef}
            onClick={handlePlayPause}
          />
        </div>
      ) : (
        <div className="alert alert-warning col-12 text-center" role="alert">
          Sin archivo de audio.
        </div>
      )}
    </div>
  );
}
