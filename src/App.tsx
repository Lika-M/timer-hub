import './App.scss';
import Header from './components/common/header/Header';
import NewTimer from './components/newTimer/NewTimer';

function App() {

  return (
    <>
      <Header />
      <main>
        <NewTimer />
      </main>
    </>
  )
}

export default App;
