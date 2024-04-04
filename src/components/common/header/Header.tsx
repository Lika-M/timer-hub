import { useContext } from "react";
import { TimerContext } from "../../../store/timerContext";
import Button from "../button/Button";
import './Header.scss';

export default function Header() {

    const ctx = useContext(TimerContext);

    if(ctx === null){
        throw new Error('Error');
    }

    return (
        <header className="header">
            <h1>React Timer</h1>
            <Button>Stop All Timers</Button>
        </header>
    );
}