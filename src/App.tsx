import React from 'react';
import Header from './components/Header';
import './App.css';

const App: React.FC = () => {
  return <div className="App">
    <Header text={"Not-Slack"}/>
    {/* <Sidebar /> */}
  </div>;
}

export default App;
