/**
* Posts.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    r: {
     type: "integer",
     required: true
    },
    c: {
     type: "integer",
     required: true
    },
    color: {
     type: "string",
     required: true
    },
    name: {
      type: "string",
      unique: true
    },
  }
};

