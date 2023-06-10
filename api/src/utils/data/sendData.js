const apiRes = require('../data/apiData');
const { Countries } = require('../../db');
const dbcopied = require('./dbcopied');
const database = async () => {
  try {
    const data1 = await apiRes(); // Wait for the promise to resolve and get the data
   const data =  Countries.findAll();
   ;
    const arrData = {
      z: dbcopied,
      a: data1,
      b: data // Fixed the mapping to return an object
    };
    return arrData;
  } catch (e) {
    return 'error en la database:\n ' + e;
  }
}

module.exports = database;