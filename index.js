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
const BearerStrategy = require('passport-http-bearer').Strategy;
const config = require('config');
const randomstring = require('randomstring');

/*
* Init
*/
const redisClient = redis.createClient({
	host: config.redis.host,
	port: config.redis.port
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.disable('x-powered-by');

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
  	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
	next();
});

const port = config.listenPort;

/*
* Authentication
*/
app.use(passport.initialize());

passport.use(new BearerStrategy(
	  (token, done) => {
		  if(!sessions[token]){
			  return done(null, false);
		  }

		  return done(null, config.users[sessions[token]]);
	  }
));

const sessions = {};

const auth = (req, res) => {
	const loginUsername = req.body.username;
	const loginPassword = req.body.password;

	if(!loginUsername || !loginPassword){
		return res.status(400).send('Parameter missing');
	}

	Object.keys(config.users).forEach((username) => {
		const user = config.users[username];

		if(loginUsername === user.username && loginPassword === user.password){
			const bearer = randomstring.generate(20);
			sessions[bearer] = username;
			return res.status(200).send(bearer);
		}
	});

	return res.status(401).send();
}

/*
* Logic
*/
const createNewEvent = (req, res) => {
	const name = req.body.name;
	const startDate = req.body.startDate;
	const duration = req.body.duration;
	const description = req.body.description || '';

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
			const newEvent = {name: name, startDate: startDate, duration: duration, id: id, description: description};
			redisClient.set(id, JSON.stringify(newEvent), (err) => {
				if(err) {
					console.error(`Error while creating Event with id ${id}.`);
					return res.status(500).send();
				}

				return res.status(200).send(newEvent);
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

		event.name = req.body.name || event.name;
		event.startDate = req.body.startDate || event.startDate;
		event.duration = req.body.duration || event.duration;
		event.description = req.body.description || event.description;

		redisClient.set(id, JSON.stringify(event), (err) => {
			if(err) {
				console.error(`Error while updating Event with id ${id}.`);
				return res.status(500).send();
			}

			return res.status(200).send(event);
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
app.post('/auth', auth);
app.post('/event', passport.authenticate('bearer', { session: false }), createNewEvent);
app.post('/event/:id', passport.authenticate('bearer', { session: false }), editEvent);
app.delete('/event/:id', passport.authenticate('bearer', { session: false }), deleteEvent);
app.get('/events', listEvents);
app.get('/event/:id', getEvent);

/*
* Start app
*/
app.listen(port, () => {
	console.log(`Event Service running on ${port}`);
});

module.exports = app;
