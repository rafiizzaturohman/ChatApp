import './App.css';
import React from 'react';
import thunk from 'redux-thunk';
import LoginForm from './components/LoginForm';
import { Route, Routes } from "react-router-dom";
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers'

const store = createStore(rootReducer, applyMiddleware(thunk))
function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        {/* <Route path='/chat' element={<FormChat />} /> */}
      </Routes>
    </Provider>
  );
}

export default App;
