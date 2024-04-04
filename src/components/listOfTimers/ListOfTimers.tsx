import useTimerContext from '../../store/useTimerContext.tsx';
import './ListOfTimers.scss';

export default function ListOfTimers() {
  const { timers } = useTimerContext();

  return (
    <>
      {timers.length
        ? <ul className="timers-list">
          {timers.map(t => {
            return (<li>{t.name} {t.duration}</li>)
          })}
        </ul>
        : <h2 className="no-timers">No timers yet!</h2>
      }
    </>
  );
}