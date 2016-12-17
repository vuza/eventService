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
const bodyParser = require('body-parser');
const hash = require('string-hash');
const async = require('async');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

/*
* Init
*/
const redisClient = redis.createClient('eventService');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/*
* Authentication
*/
passport.use(new LocalStrategy(
    (username, password, done) => {
        if(username == 'chandi' || username == 'marlon' && password == 'x'){
            return done(null, {name: username});
        }

        return done(null, false);
    }
));

app.use(passport.initialize());

/*
* Logic
*/
const createNewEvent = (req, res) => {
    const name = req.body.name;
    const startDate = req.body.startDate;
    const duration = req.body.duration;

    if(!name || !startDate || !duration){
        return res.status(400).send('Parameter missing');
    }

    const id = hash(name);

    redisClient.get(id, (err, event) => {
        if(err) {
            console.error(`Error while creating Event with id ${id}.`);
            return res.status(500).send();
        }

        if(!event){
            redisClient.set(id, JSON.stringify({name: name, startDate: startDate, duration: duration}), (err) => {
                if(err) {
                    console.error(`Error while creating Event with id ${id}.`);
                    return res.status(500).send();
                }

                return res.status(200).send(String(id));
            });
        } else {
            return res.status(400).send('Event already exists');
        }
    });
};

const editEvent = (req, res) => {
    const id = req.params.id;

    if(!id) {
        return res.status(400).send('Parameter missing');
    }

    redisClient.get(id, (err, event) => {
        if(err) {
            console.error(`Error while loading Event with id ${id}.`);
            return res.status(500).send();
        }

        if(!event){
            return res.status(404).send();
        }

        event = JSON.parse(event);

        const name = req.body.name || event.name;
        const startDate = req.body.startDate || event.startDate;
        const duration = req.body.duration || event.duration;

        redisClient.set(id, JSON.stringify({name: name, startDate: startDate, duration: duration}), (err) => {
            if(err) {
                console.error(`Error while updating Event with id ${id}.`);
                return res.status(500).send();
            }

            return res.status(200).send(String(id));
        });
    });
};

const deleteEvent = (req, res) => {
    const id = req.params.id;

    if(!id) {
        return res.status(400).send('Parameter missing');
    }

    redisClient.get(id, (err) => {
        if(err) {
            console.error(`Error while loading Event with id ${id}.`);
            return res.status(500).send();
        }

        redisClient.del(id, (err) => {
            if(err) {
                console.error(`Error while deleting Event with id ${id}.`);
                return res.status(500).send();
            }

            return res.status(200).send('OK');
        });
    });
};

const listEvents = (req, res) => {
    redisClient.keys('*', (err, ids) => {
        if(err){
            console.error('Error while reading events.');
            return res.status(500).send();
        }

        const tasks = [];
        ids.forEach((id) => {
            tasks.push((cb) => {redisClient.get(id, cb);});
        });

        async.parallel(
            tasks,
            (err, events) => {
                if(err){
                    console.error('Error while reading events.');
                    return res.status(500).send();
                }

                return res.status(200).send(events);
            }
        );
    });
};

const getEvent = (req, res) => {
    const id = req.params.id;

    if(!id) {
        return res.status(400).send('Parameter missing');
    }

    redisClient.get(id, (err, event) => {
        if(err) {
            console.error(`Error while loading Event with id ${id}.`);
            return res.status(500).send();
        }

        if(!event){
            return res.status(404).send();
        }

        return res.status(200).send(event);
    });
};

/*
* Routing
*/
const authMiddleware = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(!user){
            console.log(info);
            return res.status(403).send();
        }

        next();
    })(req, res, next);
};

app.post('/event', authMiddleware, createNewEvent);
app.post('/event/:id', authMiddleware, editEvent);
app.delete('/event/:id', authMiddleware, deleteEvent);
app.get('/events', authMiddleware, listEvents);
app.get('/event/:id', authMiddleware, getEvent);

/*
* Start app
*/
app.listen(port, () => {
    console.log(`Event Service running on ${port}`);
});

module.exports = app;
