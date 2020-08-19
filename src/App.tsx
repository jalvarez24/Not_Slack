import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
// import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Chat from './components/Chat'
import Login from './components/Login'
import { useStateValue } from './components/StateProvider'
import Home from './components/Home'
import { auth } from './firebase';
import { actionTypes } from './components/reducer'
import './App.css'
import Loader from 'react-loader-spinner'


const App: React.FC = () => {

  const [{ user }, dispatch] = useStateValue()

  const [alreadyAuthenticated, setAlreadyAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    if(!dispatch) return;
    auth.onAuthStateChanged((u) =>{
      if(u) {
        setAlreadyAuthenticated(true)
        dispatch({
          type: actionTypes.SET_USER,
          user: u
        })
      }
      else setAlreadyAuthenticated(false)
    })
  }, [dispatch])

  return <div className='App'>
    <Router>
      {alreadyAuthenticated === null ?
      <div className='loadingScreen'>
        <Loader 
          type='TailSpin'
          color='lightgrey'
          height={'50vh'}
          width={'50vh'}
        />
      </div>
      :
      !alreadyAuthenticated ? 
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
          </Switch>
        </div>
      </>
      }
    </Router>
  </div>;
}

export default App
