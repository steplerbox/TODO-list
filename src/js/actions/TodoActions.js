var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoListConstants = require('../constants/TodoConstants');


var TodoActions = {

    receiveTodoList: function (list) {
        AppDispatcher.handleAction({
            actionType: TodoListConstants.RECEIVE_DATA,
            list: list
        })
    },

    setLanguage: function (lang) {
        AppDispatcher.handleAction({
            actionType: TodoListConstants.SET_LANG,
            lang: lang
        })
    },

    switchDone: function (item) {
        AppDispatcher.handleAction({
            actionType: TodoListConstants.ITEM_DONE,
            item: item
        })
    },

    addItem: function (item) {
        AppDispatcher.handleAction({
            actionType: TodoListConstants.ITEM_ADD,
            item: item
        })
    },

    removeItem: function (item) {
        AppDispatcher.handleAction({
            actionType: TodoListConstants.ITEM_REMOVE,
            item: item
        })
    },

    updateItem: function (item, update) {
        AppDispatcher.handleAction({
            actionType: TodoListConstants.ITEM_UPDATE,
            item: item,
            update: update
        })
    }
};

module.exports = TodoActions;