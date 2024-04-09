import { useState, useEffect, useRef } from "react";
import { type ExtractedData as TimerProps } from "../newTimer/NewTimer";
import useTimerContext from "../../store/useTimerContext";


export default function SingleTimer({ name, duration }: TimerProps) {
    const hours = Number(duration.split(':')[0]);
    const minutes = Number(duration.split(':')[1]);
    const durationInMinutes = (hours * 60 + minutes) * 1000;

    const [time, setTime] = useState(durationInMinutes);
    const interval = useRef<number | null>(null);

    const { isRunning } = useTimerContext();

    useEffect(() => {
        let timer: number;

        if (isRunning) {
            timer = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime <= 0 || prevTime === null) {
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

    const remainingHours = Math.floor(time / 1000 / 60).toString().padStart(2, '0');

    let remainingMin: string;
    if (time <= 0) {
        remainingMin = Math.floor((time / 1000) % 60).toString().padStart(2, '0');
    } else {
        remainingMin = Math.floor((time / 1000) % 60 + 1).toString().padStart(2, '0');
    }

    function reset() {
        setTime(durationInMinutes)
    }

    return (
        <article>
            <h2>{time ? `${name}` : `${name} finished`}</h2>
            <p><progress max={durationInMinutes} value={time} /></p>
            <p><span>{`${remainingHours}:${remainingMin}`}</span><span onClick={reset}>reset</span></p>
        </article>
    );
}