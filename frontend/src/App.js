import './App.css';
import React from "react"
import LoginForm from './components/LoginForm';
// import FormChat from './containers/FormChat';
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';

const AppWrapper = () => {
  let routes = useRoutes([
    { path: "/", element: <LoginForm /> },
    // { path: "/chat", element: <FormChat /> }
  ]);
  return routes
}

const store = createStore(rootReducer, applyMiddleware(thunk))

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppWrapper />
      </Router>
    </Provider>
  );
};

export default App;