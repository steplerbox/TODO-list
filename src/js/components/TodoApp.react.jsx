
var React = require('react');
var TodoStore = require('../stores/TodoStore');
var TodoActions = require('../actions/TodoActions');
var TodoList = require('./TodoList.react.jsx');
var Dict = require('../dictionary');

function getAppState() {
    return {
        items: TodoStore.getListItems(),
        language: TodoStore.getLanguage()
    };
}

var TodoApp = React.createClass({

    getInitialState: function () {
        var state = getAppState();
        state.filter = "all";
        return state;
    },

    componentDidMount: function () {
        TodoStore.addChangeListener(this.onChange);
    },

    componentWillUnmount: function () {
        TodoStore.removeChangeListener(this.onChange);
    },
    
    onChange: function () {
        this.setState(getAppState());
    },
    
    changeLanguage: function (evt) {
        TodoActions.setLanguage(evt.target.options[evt.target.options.selectedIndex].value);
    },
    
    changeFilter: function(evt){
        this.setState({
            filter: evt.target.value
        });
    },

    render: function () {
        Dict.setLanguage(this.state.language);
        return (
            <div className="app-container">
                <header className="header">
                    <select className="language"
                        onChange = {this.changeLanguage}
                        value = {this.state.language}
                    >
                        <option value="en">English</option>
                        <option value="ru">Русский</option>
                    </select>
                    <h1>{Dict.get('todo-list')}</h1>
                </header>
                < TodoList
                    items = {this.state.items} 
                    count = {this.state.count}
                    dict = {Dict.get}
                    filter = {this.state.filter}
                />
                <footer className="footer">
                    <input
                        id="all"
                        type="radio"
                        name="filter"
                        value="all"
                        checked={this.state.filter === "all"}
                        onChange={this.changeFilter}
                    />
                    <label
                        htmlFor="all"
                    >
                        {Dict.get('all')}
                    </label>
                    <input
                        id="active"
                        type="radio"
                        name="filter"
                        value="active"
                        checked={this.state.filter === "active"}
                        onChange={this.changeFilter}
                    />
                    <label
                        htmlFor="active"
                    >
                        {Dict.get('active')}
                    </label>
                    <input
                        id="done"
                        type="radio"
                        name="filter"
                        value="done"
                        checked={this.state.filter === "done"}
                        onChange={this.changeFilter}
                    />
                    <label
                        htmlFor="done"
                    >
                        {Dict.get('done')}
                    </label>
                </footer>
            </div>
        );
    }
});

module.exports = TodoApp;
