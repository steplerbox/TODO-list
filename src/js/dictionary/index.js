//necessary for adding to the bundle using browserify
require('./en');
require('./ru');

var dictionary;

exports.setLanguage = function(lang) {
  dictionary = require('./' + lang);
};

exports.get = function(name) {
  if (!dictionary[name]) {
    return name;
  }
  return dictionary[name];
};