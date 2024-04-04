import useTimerContext from "../../../store/useTimerContext";
import Button from "../button/Button";
import './Header.scss';

export default function Header() {

    const ctx = useTimerContext();

    return (
        <header className="header">
            <h1>React Timer</h1>
            <Button onClick={ctx.isRunning ? ctx.stopTimers : ctx.startTimers}>
                {ctx.isRunning ? 'Stop All' : 'Start'} Timers
            </Button>
        </header>
    );
}