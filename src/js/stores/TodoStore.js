var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var _ = require('underscore');

var items = [];
var language;

function switchDone(item) {
    item.done = !item.done;
}

function addItem(item) {
    var lastId = 0;
    for (var i = 0; i < items.length; i++) {
        lastId = Math.max(items[i].id, lastId);
    }
    item.id = lastId + 1;
    items.push(item);
}

function removeItem(item) {
    items.splice(items.indexOf(item), 1);
}

function updateItem(item, update) {
    items[items.indexOf(item)].task = update;
}

function receiveTodoList(list) {
    if (list) {
        items = items.concat(list);
    }
    return;
}

function setLanguage(lang) {
    language = lang && lang !== 'undefined' ? lang : 'en';
}

var TodoStore = _.extend({}, EventEmitter.prototype, {

    getListItems: function () {
        return items;
    },

    getLanguage: function () {
        return language;
    },

    emitChange: function () {
        this.emit('change');
    },

    addChangeListener: function (callback) {
        this.on('change', callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    }
});


AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {

        case TodoConstants.ITEM_ADD:
            addItem(action.item);
            break;

        case TodoConstants.ITEM_REMOVE:
            removeItem(action.item);
            break;

        case TodoConstants.ITEM_UPDATE:
            updateItem(action.item, action.update);
            break;

        case TodoConstants.ITEM_DONE:
            switchDone(action.item);
            break;

        case TodoConstants.RECEIVE_DATA:
            receiveTodoList(action.list);
            break;

        case TodoConstants.SET_LANG:
            setLanguage(action.lang);
            break;

        default:
            return true;
    }

    TodoStore.emitChange();
    return true;
});

module.exports = TodoStore;