const getAgePlugin = require("get-age");

const getAge = ( birthday ) => {
  if( !birthday ) return new Error("Birthday is required ");


  return getAgePlugin( birthday );
};

module.exports = {
  getAge
};