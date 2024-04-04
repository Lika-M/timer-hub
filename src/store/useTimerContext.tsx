import { useContext } from "react";
import { TimerContext } from "./timerContext";

export default function useTimerContext() {
    const ctx = useContext(TimerContext);

    if (ctx === null) {
        throw new Error('Error');
    }
    return ctx;
} 