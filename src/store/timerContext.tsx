import { createContext, type ReactNode, type FC, useReducer } from "react";
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

// configure store 
const initialState: TimersState = {
    isRunning: true,
    timers: [],
};

//action types
type AddTimerAction = {
    type: 'ADD_TIMER';
    payload: Timer;
}

type StopTimersAction = {
    type: 'STOP_TIMERS';
}

type StartTimersAction = {
    type: 'START_TIMERS';
}

type Action = AddTimerAction | StopTimersAction | StartTimersAction;

function timersReducer(state: TimersState, action: Action): TimersState {

    if (action.type === 'ADD_TIMER') {
        return {
            ...state,
            timers: [...state.timers, { ...action.payload }]
        }
    }

    if (action.type === 'START_TIMERS') {
        return {
            ...state,
            isRunning: true
        }
    }

    if (action.type === 'STOP_TIMERS') {
        return {
            ...state,
            isRunning: false
        }
    }

    return state;
}

const TimersContextProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(timersReducer, initialState);

    const ctx: ContextDataStorage = {
        isRunning: state.isRunning,
        timers: state.timers,

        addTimer(timer) {
            dispatch({ type: 'ADD_TIMER', payload: timer })
        },
        startTimers() {
            dispatch({ type: 'START_TIMERS' })
        },
        stopTimers() {
            dispatch({ type: 'STOP_TIMERS' })
        },
    }
    return (
        <TimerContext.Provider value={ctx}>
            {children}
        </TimerContext.Provider>
    );
}

export default TimersContextProvider;
