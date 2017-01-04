'use strict'
var async = require('async');
var _ = require('lodash');

console.log(' ==> inside lodash and async methods practice application <== ');

// create a queue object with concurrency 2
var q = async.queue(function(task, callback) {
    console.log('hello ' + task.name);
    callback();
}, 2);

// console.log('this is q 1', q.length());
// assign a callback
q.drain = function() {
    console.log('all items have been processed',q.length());
};

// add some items to the queue
q.push({name: 'foo'}, function(err) {
    console.log('finished processing foo', q.length());
});
q.push({name: 'bar'}, function (err) {
    console.log('finished processing bar', q.length());
});

// add some items to the queue (batch-wise)
q.push([{name: 'baz'},{name: 'bay'},{name: 'bax'}], function(err) {
    console.log('finished processing item', q.length());
});
// console.log('this is q 2', q.length());

// add some items to the front of the queue
q.unshift({name: 'bar'}, function (err) {
    console.log('finished processing bar in unshift', q.length());
});

// console.log('this is q 3', q.length());

// Pretend this is some complicated async factory
var createUser = function(id, callback) {
    callback(null, {
        id: 'user' + id
    });
};

// generate 5 users
async.times(5, function(n, next) {
    createUser(n, function(err, user) {
        next(err, user);
    });
}, function(err, users) {
	console.log('the users', users);
    // we should now have 5 users
});