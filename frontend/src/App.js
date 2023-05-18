import logo from './logo.svg';
import './App.css';
// import thunk from 'redux-thunk';
// import { Route, Routes } from "react-router-dom";
// import { legacy_createStore as createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';

// const store = createStore('rootReducer')
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
