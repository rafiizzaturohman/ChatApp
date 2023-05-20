import './App.css';
import React from "react"
import LoginForm from './components/LoginForm';
import FormChat from './containers/FormChat';
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import { Route, Routes } from 'react-router-dom';

// const App = () => {
//   let routes = useRoutes([
//     { path: "/", element: <LoginForm /> },
//     { path: "/chat", element: <FormChat /> }
//   ]);
//   return routes
// }

// BrowserRouter as Router, useRoutes, Route, Routes

const store = createStore(rootReducer, applyMiddleware(thunk))

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/chat" element={<FormChat />} />
      </Routes>
    </Provider>
  );
}

export default App;