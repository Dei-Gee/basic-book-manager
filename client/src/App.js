import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Books from './components/Books';
import BookDetails from './components/BookDetails';
import AddAuthor from './components/forms/AddAuthor';
import AddBook from './components/forms/AddBook';
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
          <Route path="/author" render={(props) => <AddAuthor {...props} />} exact />
          <Route path="/book" render={(props) => <AddBook {...props} />} exact />
          <Route path="/book/:id" render={(props) => <BookDetails {...props} />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
