import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
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

// defaultTheme
import themes from './themes';

// project imports
import NavigationScroll from './layout/NavigationScroll';
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
import Routes from './routes';
const App: React.FC = () => {
  const dispatch = useDispatch();
  const customization = useSelector((state: { customization: any }) => state.customization);
  const uid = useSelector(getUserSignedInId);
  const isSignedIn = useSelector(getUserSignedIn);
  setAuthStateChangedHandler((data: any) => {
    dispatch(setCheckedSignedIn(true))
    dispatch(setAuthenticationInfo(data))
  })


  return (
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          <NavigationScroll>
            <Routes />
            <Navbar />
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  )
}

export default App
