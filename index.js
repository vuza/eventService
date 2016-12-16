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
const bodyParser = require("body-parser");
const hash = require('string-hash');

/*
 * Init
 */
const redisClient = redis.createClient('eventService');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/*
 * Logic
 */
const createNewEvent = (req, res) => {
    const name = req.body.name;
    const startDate = req.body.startDate;
    const duration = req.body.duration;

    if(!name || !startDate || !duration){
        res.status(400).send('Parameter missing');
        return;
    }

    const id = hash(name);

    redisClient.get(id, (err, event) => {
        if(!event){
            redisClient.set(id, JSON.stringify({name: name, startDate: startDate, duration: duration}), (err) => {
                if(err) {
                    console.error(`Error while creating Event with id ${id}.`);
                    res.status(500).send();
                }

                res.status(200).send('OK');
            });
        } else {
            res.status(400).send('Event already exists');
        }
    });
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
app.post('/event', createNewEvent);
app.post('/event/:id', editEvent);
app.delete('/event/:id', deleteEvent);
app.get('/events', getAllEvents);
app.get('/event/:id', getEvent);

/*
 * Start app
 */
app.listen(port, () => {
    console.log(`Event Service running on ${port}`)
});

module.exports = app;
