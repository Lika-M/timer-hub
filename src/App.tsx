import { useState } from 'react';

import Header from './components/common/header/Header';
import ListOfTimers from './components/listOfTimers/ListOfTimers';
import NewTimer from './components/newTimer/NewTimer';
import TimersContextProvider from './store/timerContext';
import './App.scss';

function App() {

  const [isFormCollapsed, setIsFormCollapsed] = useState<boolean>(false);

  function toggleForm(): void {
    if (isFormCollapsed) {
      setIsFormCollapsed(false);
    } else {
      setIsFormCollapsed(true);
    }
  }

  return (
    <TimersContextProvider>
      <Header />
      <main className={!isFormCollapsed ? 'main': 'main expanded'}>
        <NewTimer
          toggleForm={toggleForm}
          isCollapsed={isFormCollapsed}
        />
        <ListOfTimers isExpanded={isFormCollapsed}/>
      </main>
    </TimersContextProvider>
  )
}

export default App;
