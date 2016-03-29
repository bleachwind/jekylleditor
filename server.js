// server.js

// set up ========================
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var jeApp = require('./apis/jeApp');
var port = process.env.port || 3000;
var app = express();
var ghAPIroot = "https://api.github.com/";
var request = require('request');
var request_options = {
    baseUrl: ghAPIroot,
    uri: '',
    url: '',
    method: '',
    headers: {
        'User-Agent': 'JekyllEditor'
    }
};

// configuration =================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(express.static('.'));

// api ===========================
app.get('/', function(request, response) {
    response.sendfile("index.html");
});

app.post('/api/posts', function(req, res) {
    request_options.uri = 'repos/' + req.body.params.owner_name + '/' + req.body.params.repo_name + '/contents/_posts';
    request_options.method = 'GET';
    request_options.url = request_options.baseUrl + request_options.uri;
    request(request_options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json(body);
        }
    });
});

app.get('/api/posts', function(request, response) {
    response.send(jeApp.allPosts());
});

app.get('/api/posts/:id', function(request, response) {
    response.send(jeApp.getPost(request.params.id));
});

app.listen(port);

module.exports = app;