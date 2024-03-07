import React from 'react';
import './App.css';
import Nav from './pages/Nav';
import Content from './components/Content';

const App: React.FC = () => {
  return (
    <>
      <div className='App'>
        <Nav />
        <Content />
      </div>

    </>
  );
}

export default App;
