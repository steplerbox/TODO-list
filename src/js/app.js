var React = require('react');
var ReactDOM = require('react-dom');
var TodoAPI = require('./utils/TodoAPI');
var TodoApp = require('./components/TodoApp.react.jsx');

TodoAPI.init();

ReactDOM.render(
    <TodoApp />,
    document.getElementById('todo-app')
);