import { useState, useRef, useEffect } from "react";

const useAudioHook = (tracks) => {

    //state
    const [trackIndex, setTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [nextSong, setNextSong] = useState(false);



    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);


    //references
    const progressBar = useRef(); // progress bar
    const animationRef = useRef(); // reference the animation
    const audioPlayer = useRef();


    // effect
    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(seconds);
        progressBar.current.max = seconds;
        setCurrentTime(0);

    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);



    const songChangeNext = () => {
        setIsPlaying(false);
        if (trackIndex < tracks.length - 1) {
            setTrackIndex(trackIndex + 1);
            const seconds = Math.floor(audioPlayer.current.duration);
            setDuration(seconds);
            progressBar.current.max = seconds;
            changeRange();

        } else {
            setTrackIndex(0);
            changeRange();
        }
    }

    const songChangePrev = () => {
        setIsPlaying(false);
        nextSong ? setNextSong(true) : setNextSong(false);

        if (trackIndex - 1 < 0) {
            setTrackIndex(tracks.length - 1);
            changeRange();

        } else {
            setTrackIndex(trackIndex - 1);
            changeRange();
        }
    };

    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
        } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current);
        }
    };

    const forwardThirty = () => {
        progressBar.current.value = int(progressBar.current.value, 10) + 30;
        changeRange();
    };

    const backwardThirty = () => {
        progressBar.current.value = int(progressBar.current.value, 10) - 30;
        changeRange();
    };

    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
    };

    const calculateTime = (secs) => {

        if (secs.indexOf && secs.indexOf(':') > -1) {
            return secs
        }
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);

        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    };

    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime();
    };

    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty(
            "--seek-before-width",
            `${(progressBar.current.value / duration) * 100}%`
        );
        setCurrentTime(progressBar.current.value);
    };

    return ({
        isPlaying,
        duration,
        currentTime,
        audioPlayer,
        progressBar,
        calculateTime,
        togglePlayPause,
        songChangeNext,
        songChangePrev,
        backwardThirty,
        forwardThirty,
        trackIndex,
        changeRange,
        changePlayerCurrentTime,
        setTrackIndex,
        setDuration,
        setIsPlaying,
        nextSong,
        setNextSong
    });


};
export default useAudioHook;
