import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './header'
import Main from './main'

function App() {
  return (
    <div className="flex-col bg-gray-100">
      <Header />
      <Switch>
        <Main exact path='/' component={() => <Main />}/>
        <Route exact path='/cart' component={() => <Main /> }/>
      </Switch>
    </div>
  );
}

export default App;
