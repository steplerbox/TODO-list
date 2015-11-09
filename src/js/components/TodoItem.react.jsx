var React = require('react');
var ReactDOM = require('react-dom');

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

var TodoItem = React.createClass({
    
    getInitialState: function () {
        return {
            isEditing: false,
            editItemTask: ''
        };
    },
    
    componentDidUpdate: function (prevProps, prevState) {
        if (!prevState.isEditing && this.state.isEditing) {
            var editItemField = ReactDOM.findDOMNode(this.refs.editItemField);
            editItemField.focus();
            editItemField.setSelectionRange(editItemField.value.length, editItemField.value.length);
        }
    },
    
    handleEdit: function () {
        this.setState({
            isEditing: true,
            editItemTask: this.props.item.task
        });
    },
    
    handleCancel: function() {
        this.setState({
            isEditing: false,
            editItemTask: ''
        });
    },
    
    handleClickAdd: function() {
        this.props.update(this.props.item, this.state.editItemTask);
        this.handleCancel();
    },
    
    handleKeyDown: function(evt) {
        if (this.state.isEditing){
            if (evt.which === ENTER_KEY && this.state.editItemTask !== "") {
                this.handleClickAdd();
            } else if (evt.which === ESCAPE_KEY) {
                this.handleCancel();
            }
        }
    },
    
    handleChange: function(evt) {
        if (this.state.isEditing) {
            this.setState({
                editItemTask: evt.target.value
            });
        }
    },
    
    render: function () {
        var editItemField;
        if (this.state.isEditing) {
            editItemField = (
                <div className="edit-item-container clearfix">
                    <input
                        ref="editItemField"
                        className="edit-item-field"
                        value={this.state.editItemTask}

                        onKeyDown={this.handleKeyDown}
                        onChange={this.handleChange}
                    />
                    <div className="edit-btns-container">
                        <i
                            className = "btn-ok"
                            onClick = {this.handleClickAdd}
                        >{this.props.dict("ok")}</i>
                        <i
                            className = "btn-cancel"
                            onClick = {this.handleCancel}
                        >{this.props.dict("cancel")}</i>
                    </div>
                </div>);
        } else {
            editItemField = null;
        }
        return (
            <li className={"todo-item" + 
                    (this.props.item.done ? " done" : " active")}>
                <div className={this.state.isEditing ? "editing" : "view"}>
                    <input
                        id={"checkbox_" + this.props.item.id}
                        type="checkbox"
                        onChange={this.props.toggle}
                        checked={this.props.item.done}
                    />
                    
                    <label
                        htmlFor={"checkbox_" + this.props.item.id}
                        className="toggle icon-check fa fa-check"
                    ></label>
                    
                    <span className="task">
                        {this.props.item.task}
                    </span>
                    <div className="btns-container">
                        <i 
                            className="edit icon-pencil fa fa-pencil"
                            onClick={this.handleEdit}
                        ></i>
                        <i 
                            className="remove icon-remove fa fa-times"
                            onClick={this.props.remove}
                        ></i>
                    </div>
                </div>

                {editItemField}
        
            </li>
        );
    },
});

module.exports = TodoItem;
