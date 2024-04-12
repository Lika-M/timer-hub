import { useState, useEffect, useRef } from "react";
import { type ExtractedData as TimerProps } from "../newTimer/NewTimer";
import useTimerContext from "../../store/useTimerContext";

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
            console.log(isActive)
            console.log(isRunning)
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
        console.log(isActive)
        console.log(isRunning)
        setIsActive(true);
    }

    function stopTimer() {
        console.log(isActive)
        console.log(isRunning)
        setIsActive(false);
    }

    function deleteTimerById() {
        deleteTimer({ id: id, name: name, duration: duration });
    }

    return (
        <article>
            <h2>{time ? `${name}` : `${name} finished`}</h2>
            <p><progress max={durationInSeconds} value={time} /></p>
            <p>{`${remainingHours}:${remainingMinutes}:${remainingSeconds}`}</p>
            <p className="timer-btn">
                <span onClick={reset}>Reset</span>
                <span onClick={deleteTimerById}>Delete</span>
                <span onClick={startTimer}>Start</span>
                <span onClick={stopTimer}>Stop</span>
            </p>
            <p className="timer-btn">
            </p>
        </article>
    );
}
