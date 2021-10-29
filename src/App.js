import Home from './pages/home/Home'
import { useContext } from 'react'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'
import Register from './pages/register/Register'
import Messenger from './pages/messenger/Messenger'
import {BrowserRouter as Router, Route,Switch, Redirect} from 'react-router-dom'
import {AuthContext} from './context/AuthContext'


function App(){
    
    const {user} = useContext(AuthContext)
    console.log(user)
    return (
        <>
      <Router>
          <Switch>
          <Route exact path='/'>
                  {user ? <Home/> : <Register/>}
              </Route>
              <Route exact path='/login'>
                  {user ? <Redirect to="/"/>: <Login/>}
              </Route>
              <Route exact  path='/register'>
              {user ? <Redirect to="/"/>: <Register/>}
              </Route>
              <Route exact path='/profile/:username'>
                  <Profile/>
              </Route>
              <Route exact  path='/messages'>
              {!user ? <Redirect to="/login"/>: <Messenger/>}
              </Route>
          </Switch>
     </Router>
       </>
    )
}

export default App