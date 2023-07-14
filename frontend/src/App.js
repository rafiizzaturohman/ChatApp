import './App.css';
import React from "react"
import LoginForm from './components/LoginForm';
import ChatForm from './containers/ChatForm';
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import { Route, Routes } from 'react-router-dom';

const store = createStore(rootReducer, applyMiddleware(thunk))

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/chat" element={<ChatForm />} />
      </Routes>
    </Provider>
  );
}

export default App;