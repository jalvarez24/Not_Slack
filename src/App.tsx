import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './App.css';

const App: React.FC = () => {
  return <div className="App">
    <Header text={"Not-Slack"}/>
    <div className="app__body">
      <Sidebar />
    </div>
  </div>;
}

export default App
