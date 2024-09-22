import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './HomePage';
import NavigationBar from './NavigationBar';
import NotFound from './NotFound';


function App() {
  return (
    <Router>
    <div className="App">
      <NavigationBar />
      <div className="content">
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  </Router>
  );
}

export default App;
