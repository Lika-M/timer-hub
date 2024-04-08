import useTimerContext from '../../store/useTimerContext.tsx';
import './ListOfTimers.scss';
import SingleTimer from '../singleTimer/SingleTimer.tsx';

export default function ListOfTimers() {
  const { timers } = useTimerContext();

  return (
    <>
      {timers.length
        ? <ul className="timers-list">
          {timers.map(t => {
            return (<li key={t.id}>
              <SingleTimer {...t}/>
            </li>)
          })}
        </ul>
        : <h2 className="no-timers">No timers yet!</h2>
      }
    </>
  );
}