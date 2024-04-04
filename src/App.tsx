import Header from './components/common/header/Header';
import ListOfTimers from './components/listOfTimers/ListOfTimers';
import NewTimer from './components/newTimer/NewTimer';
import TimersContextProvider from './store/timerContext';
import './App.scss';

function App() {

  return (
    <TimersContextProvider>
      <Header />
      <main>
        <NewTimer />
        <ListOfTimers />
      </main>
    </TimersContextProvider>
  )
}

export default App;
