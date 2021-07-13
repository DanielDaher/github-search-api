import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './Components/Search';
import UserDetails from './Components/UserDetails';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
        <Route exact path='/' component={ Search }/>
        <Route exact path='/details/:login' component={ UserDetails }/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
