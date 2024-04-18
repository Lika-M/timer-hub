import useTimerContext from '../../store/useTimerContext.tsx';
import SingleTimer from '../singleTimer/SingleTimer.tsx';
import Button from '../common/button/Button.tsx';
import './ListOfTimers.scss';

type ListOfTimersProps = {
  isExpanded: boolean;
}

export default function ListOfTimers({ isExpanded }: ListOfTimersProps) {
  const ctx = useTimerContext();

  return (
    <article className="timers">
      {ctx.timers.length
        ?
        <section className={isExpanded ? "timers-wrapper expanded" : "timers-wrapper"}>
          <ul className="timers-list" >
            {ctx.timers.map(t => {
              return (<li key={t.id}>
                <SingleTimer {...t} />
              </li>)
            })}
          </ul>
          <aside className='timers-buttons'>
            <Button onClick={ctx.startTimers} disabled={ctx.isRunning}>
              Run All
            </Button>
            <Button onClick={ctx.stopTimers} disabled={!ctx.isRunning}>
              Stop All
            </Button>
          </aside>
        </section>
        :
        <section className="no-timers">
          <h2>No timers yet!</h2>
          <img src="/assets/timer.png" alt="Timer" />
        </section>}
    </article>
  );
}