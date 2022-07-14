import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaPlay, FaPause, FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import styles from "/styles/AudioPlayer.module.css";
import tracks from "./tracks";
import useAudioHook from "./useAudioHook";
import 'animate.css';


const AudioPlayer = () => {

  const { isPlaying,
    duration,
    currentTime,
    audioPlayer,
    progressBar,
    togglePlayPause,
    songChangeNext,
    songChangePrev,
    calculateTime,
    trackIndex,
    nextSong,
    changeRange,
  } = useAudioHook(tracks);

  const { title, artist, audioSrc, coverArt } = tracks[trackIndex];

  return (
    // <div className={styles.audioPlayer + ' animate__animated animate__fadeIn'}>
    <div className={nextSong ? styles.audioPlayer + ' animate__animated animate__fadeIn' : styles.audioPlayer + ' animate__animated animate__fadeIn'}>

      < div className={styles.imgContainer} >
        <Image src={coverArt} width={250}
          height={250} layout="intrinsic" alt="big win" className={styles.img} />
      </div >

      <h2 className={styles.title}>{title}</h2>
      <h4 className={styles.artist}>{artist}</h4>
      <audio ref={audioPlayer} src={audioSrc} preload="metadata"></audio>
      {/* progress bar time */}
      <div className={styles.progressBarContainer}>
        <input
          className={styles.progressBar}
          type="range"
          defaultValue="0"
          ref={progressBar}
          onChange={changeRange}
        />
      </div>
      <div className={styles.progressBarTop}>
        {/* current time */}
        <div className={styles.currentTime}>{calculateTime(currentTime)}</div>
        {/* duration */}
        <div className={styles.duration}>{calculateTime(duration)}</div>
      </div>
      <div className={styles.playersButton} >
        <button className={styles.forwardBackward} onClick={songChangePrev} >
          <FaAngleDoubleLeft />{" "}
        </button>
        {/* <button className={styles.forwardBackward} onClick={backwardThirty}>
          <FaAngleLeft />{" "}
        </button> */}
        <button className={styles.playPause} onClick={togglePlayPause}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        {/* <button className={styles.forwardBackward} onClick={forwardThirty}>
          <FaAngleRight />
        </button> */}
        <button className={styles.forwardBackward} onClick={songChangeNext}>
          <FaAngleDoubleRight />{" "}
        </button>
      </div>
    </div >
  );
};

export default AudioPlayer;
