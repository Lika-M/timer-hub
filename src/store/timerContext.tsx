import { createContext, type ReactNode, type FC } from "react";
import { ExtractedData as Timer } from '../components/newTimer/NewTimer.tsx'

type TimersState = {
    isRunning: boolean;
    timers: Timer[];
}

type TimersStateManipulators = {
    addTimer: (data: Timer) => void;
    startTimers: () => void;
    stopTimers: () => void;
}

type ContextDataStorage = TimersState & TimersStateManipulators;

export const TimerContext = createContext<ContextDataStorage | null>(null);

const TimersContextProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const ctx: ContextDataStorage = {
        isRunning: false,
        timers: [],

        addTimer() {
            //TODO
        },
        startTimers() {
            //TODO
        },
        stopTimers() {
            //TODO
        },
    }
    return (
        <TimerContext.Provider value={ctx}>
            {children}
        </TimerContext.Provider>
    );
}

export default TimersContextProvider;
