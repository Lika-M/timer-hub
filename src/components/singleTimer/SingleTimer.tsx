import { useState, useEffect, useRef } from "react";
import { type ExtractedData as TimerProps } from "../newTimer/NewTimer";
import useTimerContext from "../../store/useTimerContext";

export default function SingleTimer({ name, duration }: TimerProps) {

    const [time, setTime] = useState(duration * 1000 * 60); //in min
    const interval = useRef<number | null>(null);

    const { isRunning } = useTimerContext();

    if (time <= 0) {
        clearInterval(interval.current!);
    }

    useEffect(() => {
        let timer: number;
        if (isRunning) {
            timer = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime <= 0) {
                        return 0;
                    }
                    return prevTime - 100;
                });
            }, 100);
            interval.current = timer;
        } else if (interval.current) {
            clearInterval(interval.current);
        }

        return () => clearInterval(timer);
    }, [isRunning]);

    const remainingTime = (time / 1000 / 60).toFixed(2);

    return (
        <article>
            <h2>{time ? `${name}` : `${name} finished`}</h2>
            <p><progress max={duration * 1000 * 60} value={time} /></p>
            <p>{remainingTime}</p>
        </article>
    );
}