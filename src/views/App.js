import React, { Component } from 'react';
import '../shared/App.css';
import Header from './header.js';
import FormInvoice from './FormInvoice.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <FormInvoice/>
      </div>
    );
  }
}

export default App;
