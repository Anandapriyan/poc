'use strict';

// Import the node modules requires for this sample poc
var Shopify = require('shopify-node-api');
var _ = require('lodash');
var async = require('async');

var Q = require('q');

// use the shopify hardcoded params for config

var config = {};
	config.shop = 'toyandsport.myshopify.com';// MYSHOP.myshopify.com 
	config.shopify_api_key = '96a409462753167b6f54b7b950372963';// Your API key 
	config.shopify_shared_secret = '2223c37b0b707943dc345250d5eb9470';// Your Shared Secret 
	config.access_token = 'b4e0a95375176c2612dd623a38dd9183';//permanent token 

var i = 0;
// function to make shopify call
var getMerchantInfo = function(config){
	var shopify = new Shopify(config);
	shopify.get('/admin/shop', function(err, data, header) {
		if (err) {
			console.log(" shopify.shop error ", err);
		} /*else if(header.http_x_shopify_shop_api_call_limit > '35/40') {
			console.log('this is type of x',typeof header.http_x_shopify_shop_api_call_limit);
			while (i < 10) {
				console.log('halt', i);
				i++;
			}
		} */else {
			console.log(" shopify.shop data ", i++ , data);
			console.log('header', header.http_x_shopify_shop_api_call_limit);
		}
	})
};

// create a sample testArray to make the number of shopify requests

var callTimes = _.fill(Array(500), 'a');

console.log('this is callTimes', callTimes);

/*callTimes.map(function(value){
	getMerchantInfo(config);
})*/
// var getMerchantInfos = function(){
// 	console.log('abc',new Date());
// }
// async.each(callTimes, function(file, callback) {

// 	// Perform operation on file here.
// 	console.log('Processing file ' , Date.now());
// 	setTimeout(function(){
// 					console.log('abc',Date.now());
// 				}, 5000);
	
// 	callback();
// 	// if( file.length > 32 ) {
// 	// 	console.log('This file name is too long');
// 	// 	callback('File name too long');
// 	// } else {
// 	// 	// Do work to process file here
// 	// 	console.log('File processed');
// 	// 	callback();
// 	// }
// }, function(err) {
// 	// if any of the file processing produced an error, err would equal that error
// 	if( err ) {
// 		// One of the iterations produced an error.
// 		// All processing will now stop.
// 		console.log('A file failed to process');
// 	} else {
// 		console.log('All files have been processed successfully');
// 	}
// });

// var stuff = {};

Q.all(callTimes.map(function(stuff, idx) {
	var deferred = Q.defer();
	console.log('this is idx', idx);
	console.log('this is idx', idx);
	setTimeout(function(){
		// put Stuff update to Shopify
		getMerchantInfo(config);
		deferred.resolve();
	}, idx * 500);
	return deferred.promise;
}));

// function wait(duration=0){
// 	var deferred = Q.defer();
// 	setTimeout(function(){deferred.resolve()}, duration);
// 	return deferred.promise;
// }

/**
 * stuffs - an array of Stuff that needs to get updated
 * returns an array of promises that resolve after a successfully updated Stuff
**/
// stuff.getStuff = function(stuffs){
// 	return Q.all(stuffs.map(function(stuff, idx){
// 		wait(idx * 500).then(function(){
// 			// put Stuff update to Shopify
// 			getMerchantInfo(config);
// 			return;
// 		});
// 	}));
// }