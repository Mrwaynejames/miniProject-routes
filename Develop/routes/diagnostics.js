const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  readFromFile('./db/diagnostics.json').then((data) => res.json(JSON.parse(data)));
  // TODO: Logic for sending all the content of db/diagnostics.json
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  const { time, errors } = req.body
  // TODO: Logic for appending data to the db/diagnostics.json file
  if (req.body) {
    const newDiag = {
      time,
      error_id: uuidv4(),
      errors
    };

    readAndAppend(newDiag, './db/diagnostics.json');
    res.json('Killin it diag added')
    
  } else {
    res.error("its wrong buddy")
  }
});

module.exports = diagnostics;
