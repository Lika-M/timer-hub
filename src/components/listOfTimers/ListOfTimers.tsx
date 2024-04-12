import useTimerContext from '../../store/useTimerContext.tsx';
import SingleTimer from '../singleTimer/SingleTimer.tsx';
import Button from '../common/button/Button.tsx';
import './ListOfTimers.scss';

export default function ListOfTimers() {
  const ctx = useTimerContext();

  return (
    <article>
      {ctx.timers.length
        ?
        <section className='timers-wrapper'>
          <ul className="timers-list">
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
        <section>
          <h2 className="no-timers">No timers yet!</h2>
        </section>}
    </article>
  );
}