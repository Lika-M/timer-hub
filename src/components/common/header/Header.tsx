import Button from "../button/Button";
import './Header.scss';

export default function Header() {

    return (
        <header className="header">
            <h1>React Timer</h1>
            <Button>Stop All Timers</Button>
        </header>
    );
}