var express = require('express');
var server = express();
var path = require('path');
var axios = require('axios');

var port = process.argv[2];
server.use(express.static(path.join(__dirname,'public')));



server.get('/', function(req, res){
	res.sendFile('public/index.html', {root: __dirname});
});

server.get('/cfsr/daily',function(req, res){
	axios.get('http://api.clearscienceinc.com/api/v1/point/cfsr/daily', {
		params: {
			lat: req.query.lat,
			lon: req.query.lon,
			parameter: req.query.parameter,
			start_date: req.query.start_date,
			end_date: req.query.end_date,
			units: req.query.units,
			aggregator: req.query.aggregator
		}
	})
	.then(function(response){
		res.json(response.data);
	})
	.catch(function(err){
		res.status(500).json({
			err: err
		});
	});
});

server.get('/cfs/daily', function(req, res){
	axios.get('http://api.clearscienceinc.com/api/v1/point/cfs/daily', {
		params: {
			lat: req.query.lat,
			lon: req.query.lon,
			parameter: req.query.parameter,
			start_date: req.query.start_date,
			end_date: req.query.end_date,
			units: req.query.units,
			aggregator: req.query.aggregator
		}
	})
	.then(function(response){
		res.json(response.data);
	})
	.catch(function(err){
		res.status(500).json({
			err: err
		});
	});
});

server.listen(port, function(){
	console.log('Now listening on port ' + 9000);
});
