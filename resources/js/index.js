import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

if (document.getElementById('root')) {
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );
}
