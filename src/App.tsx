import React from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Chat from './components/Chat'
import Login from './components/Login'
import { useStateValue } from './components/StateProvider'
import Home from './components/Home'
import './App.css'

const App: React.FC = () => {

  const [{ user }] = useStateValue()

  return <div className='App'>
    <Router>
      {!user ? 
      <Login />
      :
      <>
        <Header />
        <div className='app__body'>
          <Sidebar />

          <Switch>
            <Route path='/room/:roomId'>
              <Chat />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
            <Redirect to='/' />
          </Switch>
        </div>
      </>
      }
    </Router>
  </div>;
}

export default App
