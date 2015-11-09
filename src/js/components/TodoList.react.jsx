
var React = require('react');
var TodoActions = require('../actions/TodoActions');
var TodoItem = require('./TodoItem.react.jsx');

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;
var ACTIVE_ITEMS = 'active';
var DONE_ITEMS = 'done';

var TodoList = React.createClass({
    
    getInitialState: function () {
        return {
            newItem: ''
        };
    },
    
    done: function (item) {
        TodoActions.switchDone(item);
    },
    
    submit: function () {
        if (this.state.newItem !== "") {
            var item = {
                task: this.state.newItem,
                done: false
            }
            TodoActions.addItem(item);
        }
    },
    
    remove: function(item) {
        TodoActions.removeItem(item);
    },
    
    update: function(item, update) {
        TodoActions.updateItem(item, update);
    },
    
    handleCancel: function() {
        this.setState({
            newItem: ''
        });
    },
    
    handleClickAdd: function() {
        this.submit();
        this.handleCancel();
    },
    
    handleKeyDown: function (evt) {
        if (evt.which === ENTER_KEY) {
            this.submit();
            this.handleCancel();
        } else if (evt.which === ESCAPE_KEY) {
            this.handleCancel();
        }
    },
    
    handleChange: function (event) {
        this.setState({
            newItem: event.target.value
        });
    },

    render: function () {
        var _this = this;
        
        var shownItems = this.props.items.filter(function (item) {
            switch (this.props.filter) {
				case ACTIVE_ITEMS:
					return !item.done;
				case DONE_ITEMS:
					return item.done;
				default:
					return true;
				}
			}, this);
        
        return (
            <main className = "main">
                <div className="new-item-container clearfix">
                    <input
                        className = "new-item-field"
                        placeholder = {this.props.dict("new-todo-item")}
                        value = {this.state.newItem}
                        onKeyDown = {this.handleKeyDown}
                        onChange = {this.handleChange}
                    />
                    <div className={"edit-btns-container " +
                        (this.state.newItem === '' ? "hidden" : "show")}>
                        <i
                            className = "btn-ok"
                            onClick = {this.handleClickAdd}
                        >{this.props.dict("ok")}</i>
                        <i
                            className = "btn-cancel"
                            onClick = {this.handleCancel}
                        >{this.props.dict("cancel")}</i>
                    </div>
                </div>
                <ul className="todo-list">
                    {shownItems.map(function(item) {
                        return (
                            <TodoItem
                                dict = {_this.props.dict}
                                key = {item.id}
                                item = {item}

                                update = {_this.update}
                                remove = {_this.remove.bind(_this, item)}
                                toggle = {_this.done.bind(_this, item)}
                            />
                        );
                    })}
                </ul>
                
            </main>
        );
    },

});

module.exports = TodoList;
