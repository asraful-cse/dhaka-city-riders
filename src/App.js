import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Destination from './Components/Destination/Destination';
import Login from './Components/Login/Login';
import Header from './Components/Header/Header';
import { createContext, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import NoMatch from './Components/NoMatch/NoMatch';


export const UserContext = createContext();



function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header />
        <Switch>

          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/home">
            <Home />
          </Route>

          <PrivateRoute path="/destination/:riderId">
            <Destination />
          </PrivateRoute >

          <PrivateRoute path="/destination">
            <Destination />
          </PrivateRoute >

          <Route path="/login">
            <Login />
          </Route>

          <Route path="*">
          <NoMatch />
        </Route>

        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
