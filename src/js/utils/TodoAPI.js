var TodoActions = require('../actions/TodoActions');
var TodoStore = require('../stores/TodoStore');

var TodoAPI = {
    
    init: function () {
        this.getTodoList();
        this.getLanguage();
        TodoStore.addChangeListener(function () {
            TodoAPI.setTodoList(TodoStore.getListItems())
        });
        TodoStore.addChangeListener(function () {
            TodoAPI.setLanguage(TodoStore.getLanguage())
        });
    },
    
    getTodoList: function () {
        var list = localStorage.getItem('list');
        var listJSON = JSON.parse(list);
        TodoActions.receiveTodoList(listJSON);
    },

    getLanguage: function () {
        TodoActions.setLanguage(localStorage.getItem('lang'));
    },

    setTodoList: function (list) {
        localStorage.setItem('list', JSON.stringify(list));
    },

    setLanguage: function (lang) {
        localStorage.setItem('lang', lang);
    }
};

module.exports = TodoAPI;