const redis = require('redis');
const request = require('supertest');
const assert = require('assert');
const fakeredis = require('fakeredis');
const sinon = require('sinon');
const randomstring = require('randomstring');
const async = require('async');
const hash = require('string-hash');

describe('Event Service', () => {
	var redisClient;
	var eventService;

	before(() => {
		// Mock redis
		sinon.stub(redis, 'createClient', fakeredis.createClient);
		eventService = require('./index');
		redisClient = redis.createClient({
			host: '127.0.0.1',
			port: 6379
		});
	});

	afterEach((done) => {
		redisClient.flushdb((err) => {
			assert(!err, err ? err.message : '');
			done();
		});
	});

	describe('createNewEvent', () => {
		it('should not save new event, since name has to be unique', (done) => {
			const name = 'testevent';
			const id = hash(name);

			redisClient.set(id, 'xx', () => {
				request(eventService)
				.post('/event')
				.set('Content-Type', 'application/x-www-form-urlencoded')
				.send({name: name, startDate: 'ya', duration: 'asdf', username: 'marlon', password: 'x'})
				.expect(400, (err) => {
					assert(!err, err ? err.message : '');

					done();
				});
			});
		});

		it('should save a new event to DB', (done) => {
			const name = 'xyzEvent';
			const startDate = 'akljf';
			const duration = 'LJKd';

			request(eventService)
			.post('/event?username=marlon&password=x')
			.set('Content-Type', 'application/x-www-form-urlencoded')
			.send({name: name, startDate: startDate, duration: duration, username: 'marlon', password: 'x'})
			.expect(200, (err, res) => {
				assert(!err, err ? err.message : '');
				assert.notEqual(res.text, null);

				redisClient.get(res.text, (err, event) => {
					assert(!err, err ? err.message : '');
					assert.notEqual(event, null);

					event = JSON.parse(event);
					assert.equal(event.name, name);
					assert.equal(event.startDate, startDate);
					assert.equal(event.duration, duration);

					done();
				});
			});
		});
	});

	describe('edit event', () => {
		it('should update an existing event', (done) => {
			const name = 'testevent';
			const id = hash(name);

			redisClient.set(id, JSON.stringify({name: name, startDate: 'llkasdf', duration: 'asldfkj'}), () => {
				const newName = 'laskjf';
				const newStartDate = 'aslkdfj';
				const newDuration = 'sdf';

				request(eventService)
				.post(`/event/${id}?username=marlon&password=x`)
				.send({name: newName, startDate: newStartDate, duration: newDuration, username: 'marlon', password: 'x'})
				.expect(200, (err, res) => {
					assert(!err, err ? err.message : '');

					redisClient.get(res.text, (err, event) => {
						assert(!err, err ? err.message : '');
						assert.notEqual(event, null);

						event = JSON.parse(event);
						assert.equal(event.name, newName);
						assert.equal(event.startDate, newStartDate);
						assert.equal(event.duration, newDuration);

						done();
					});
				});
			});
		});
	});

	describe('delete event', () => {
		it('should delte an event', (done) => {
			const name = 'testevent';
			const id = hash(name);

			redisClient.set(id, JSON.stringify({name: name, startDate: 'llkasdf', duration: 'asldfkj'}), () => {
				redisClient.exists(id, (err, exists) => assert(exists));

				request(eventService)
				.delete(`/event/${id}?username=marlon&password=x`)
				.expect(200, (err) => {
					assert(!err, err ? err.message : '');
					redisClient.exists(id, (err, exists) => assert(!exists));

					done();
				});
			});
		});
	});

	describe('list events', () => {
		it('should list all events', (done) => {
			const createRandomEvent = (name, cb) => {
				const startDate = randomstring.generate(7);
				const duration = randomstring.generate(7);
				const id = hash(name);

				redisClient.set(id, JSON.stringify({name: name, startDate: startDate, duration: duration}), cb);
			};

			const names = ['firstName', 'secondName', 'thirdName'];

			async.parallel([
				async.apply(createRandomEvent, names[0]),
				async.apply(createRandomEvent, names[1]),
				async.apply(createRandomEvent, names[2])
			], (err) => {
				assert(!err, err ? err.message : '');

				request(eventService)
				.get('/events?username=marlon&password=x')
				.expect(200, (err, res) => {
					assert(!err, err ? err.message : '');
					assert(res.text);

					const events = JSON.parse(res.text);
					assert.equal(Object.keys(events).length, names.length);

					const eventsFound = [];
					for(var i = 0; i < Object.keys(events).length; i++){
						eventsFound.push(JSON.parse(events[i]).name);
					}

					const sortNames = (a, b) => a < b;
					assert.deepEqual(names.sort(sortNames), eventsFound.sort(sortNames));

					done();
				});
			});
		});
	});

	describe('get event', () => {
		it('should return a specific event', (done) => {
			const name = 'anyname';
			const string = randomstring.generate(7);
			const id = hash(name);

			redisClient.set(id, JSON.stringify({name: name, startDate: string, duration: string}), (err) => {
				assert(!err, err ? err.message : '');

				request(eventService)
				.get(`/event/${id}?username=marlon&password=x`)
				.expect(200, (err, res) => {
					assert(!err, err ? err.message : '');

					const event = JSON.parse(res.text);
					assert.deepEqual(event, {name: name, startDate: string, duration: string});

					done();
				});
			});
		});
	});
});
