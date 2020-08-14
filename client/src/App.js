import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Books from './components/Books';
import BookDetails from './components/BookDetails';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header className="App-header">
          <h2>Book Manager Frontend</h2>
        </header>

        <Switch>
          <Route path="/" component={Books} exact />
          <Route path="/book/:id" render={(props) => <BookDetails {...props} />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
