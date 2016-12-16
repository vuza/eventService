/*
 * Config
 */
const port = 8080;

/*
 * Dependencies
 */
const express = require('express');
const app = express();
const redis = require('redis');

/*
 * Logic
 */
const createNewEvent = (req, res) => {

};

const editEvent = (req, res) => {

};

const deleteEvent = (req, res) => {

};

const getAllEvents = (req, res) => {

};

const getEvent = (req, res) => {

};

/*
 * Routing
 */
app.post('event', createNewEvent);
app.post('event/:id', editEvent);
app.delete('event/:id', deleteEvent);
app.get('events', getAllEvents);
app.get('event/:id', getEvent);

/*
 * Start app
 */
app.listen(port, () => {
    console.log(`Asiamed Event Backend running on ${port}`)
})
