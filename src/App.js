import React, { Component } from 'react';
import './App.css';
import UsersComponent from './components/users/usersComponent';
import { Provider } from "react-redux";
import configureStore from './store';

const store = configureStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <UsersComponent />
            </Provider>
        );
    }
}

export default App;