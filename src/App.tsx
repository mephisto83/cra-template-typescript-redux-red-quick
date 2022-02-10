import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { 
  getUserSignedIn,
  getUserSignedInId,
  setAuthenticationInfo,
  setCheckedSignedIn 
} from './features/application/application-slice'
import { Navbar } from './components/Navbar'
import { setAuthStateChangedHandler } from './features/firebase-app'
import { About } from './pages/About'
import { Home } from './pages/Home'

const App: React.FC = () => {
  const dispatch = useDispatch();
  const uid = useSelector(getUserSignedInId);
  const isSignedIn = useSelector(getUserSignedIn);
  setAuthStateChangedHandler((data: any) => {
    dispatch(setCheckedSignedIn(true))
    dispatch(setAuthenticationInfo(data))
  })


  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
          {/* Inject_Routes_Here */}
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
