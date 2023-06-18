// utils.js

function getLanguageFromPath(path) {
    const language = path.split('/')[1];
    return language;
  }
  
  module.exports = {
    getLanguageFromPath,
  };
  