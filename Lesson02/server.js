'use strict'

const http = require('http');
const fs = require('fs');
const url = require('url');

const port = 6249;
const mainPage = fs.readFileSync('index.html', 'utf-8');
const replyPageTemplate = fs.readFileSync('reply.html.template', 'utf-8');


const server = http.createServer((request, response) => {
	let page = mainPage;
	const parseQuery = true;
	const parsedURL = url.parse(request.url, parseQuery);
	const name = parsedURL.query['first-name'];
	if (name) {
	
	page = replyPageTemplate.replace('%NAME%', name);

	}
	console.log(name);
	response.writeHead(200, {'Content-Type' : 'text/html'});
	response.write(page);
	response.end();

	});

server.listen(port, function() {
	console.log("The server is listening on port " + port);
});

