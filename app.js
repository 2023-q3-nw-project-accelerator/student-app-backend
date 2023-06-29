// App.js
// Define the route handlers
const express = require('express');
const studentData = require('./studentData.json');

// Create an instance of an Express application
const app = express();

// Define our routes
// Healthcheck route
// GET / method = GET path = /
app.get('/', (request, response) => {
  // handler goes here
  response.status(200).json({ data: 'Service is running!' });
});

// GET /students
// define path + method and handler
// catch errors
app.get('/students', (request, response) => {
  try {
    const { students } = studentData;
    response.status(200).json({ data: students });
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});

// GET /students/11
app.get('/students/:id', (request, response) => {
  try {
    const { id } = request.params;
    const { students } = studentData;
    const student = students.find((student) => student.id === id);
    if (student) {
      response.status(200).json({ data: student });
    } else {
      response.status(404).json({ error: `No student with id of ${id}` });
    }
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});

module.exports = app;
