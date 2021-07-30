import logo from './logo.svg';
import './App.css';
import {loggedInUserState, selectorUserState} from "./session-init"
import {useRecoilValue}  from "recoil"
import Navbar from './components/navbar';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Homepage from './page/homepage';
import Footbar from './components/footbar';
import NotFound from './page/not-found';
import Toko from './page/toko-dorayaki';
import Dorayaki from './page/dorayaki';
import About from './page/about';


function App() {
  const loggedInUser = useRecoilValue(selectorUserState)
  return (
    <div>
      
      <Router>
      <Navbar/>
        <Switch>
          <Route path="/register">
          
          </Route>
          <Route path="/login">
          
          </Route>
          <Route path="/about">
            <About/>
          </Route>
          <Route path="/toko/:id?">
            <Toko/>
          </Route>
          <Route path="/dorayaki/:id?">
            <Dorayaki/>
          </Route>
          <Route path="/" exact={true}>
            <Homepage/>
          </Route>
          <Route path="/404nf">
              <NotFound/>
          </Route>
          <Redirect path="*" to="/404nf"/>
        </Switch>
      </Router>
      <Footbar/>
    </div>
  );
}

export default App;
