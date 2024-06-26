import { BiSolidRightArrow } from "react-icons/bi";
import { IoPause } from "react-icons/io5";
import { GrClose, GrPowerReset } from "react-icons/gr";

import { useState, useEffect, useRef } from "react";
import { type ExtractedData as TimerProps } from "../newTimer/NewTimer";
import useTimerContext from "../../store/useTimerContext";

import './SingleTimer.scss';

export default function SingleTimer({ id, name, duration }: TimerProps) {

    const [inputHours, inputMinutes, inputSeconds] = duration.split('/').map(Number);
    const durationInSeconds = inputHours * 360 + inputMinutes * 60 + inputSeconds;

    const [time, setTime] = useState(durationInSeconds);
    const [isActive, setIsActive] = useState<boolean>(true)
    const interval = useRef<number | null>(null);

    const { isRunning, deleteTimer } = useTimerContext();

    useEffect(() => {
        let timer: number;

        if (isRunning && isActive) {
            timer = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime <= 0 || prevTime === null) {
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

            interval.current = timer;

        } else if (interval.current && (!isRunning || !isActive)) {
            clearInterval(interval.current);
        }

        return () => clearInterval(timer);
    }, [isRunning, isActive]);

    const remainingHours = Math.floor(time / 3600).toString().padStart(2, '0');
    const remainingMinutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const remainingSeconds = (time % 60).toString().padStart(2, '0');

    function reset() {
        setTime(durationInSeconds);
    }

    function startTimer() {
        setIsActive(true);
    }

    function stopTimer() {
        setIsActive(false);
    }

    function deleteTimerById() {
        deleteTimer({ id: id, name: name, duration: duration });
    }

    return (
        <>
            <h2>{time ? `${name}` : `${name} finished`}</h2>
            <p translate="no">{`${remainingHours}:${remainingMinutes}:${remainingSeconds}`}</p>
            <div className="progress-container">
                <progress max={durationInSeconds} value={time} />
            </div>
            <div className="button-container">
                <button
                    onClick={reset}
                    disabled={!isRunning}>
                    <GrPowerReset />
                </button>
                <button
                    className={isActive ? 'stop' : 'start'}
                    onClick={isActive ? stopTimer : startTimer}
                    disabled={!isRunning}>
                    {isActive ? <IoPause /> : <BiSolidRightArrow />}
                </button>
                <button
                    onClick={deleteTimerById}
                    disabled={!isRunning}>
                    <GrClose />
                </button>
            </div>
        </>
    );
}
