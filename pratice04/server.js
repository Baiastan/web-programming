const http = require('http');
const fs = require('fs');
const util = require('util');
const qs = require('querystring');

const port = 6249;
const pageTemplate = fs.readFileSync('reply.html.template', 'utf-8');

let guestbookEntries = [];




function renderPage() {
	let entries = '';
	for(message of guestbookEntries){
    		entries += `<p>${message.name}</p>` + `<p>${message.message}</p>`;
	}
	const page = util.format(pageTemplate, entries);
	return page;
}
function send(response, data) {
	response.writeHead(200, {'Content-Type' : 'text/html'});
	response.write(data);
	response.end();
}
function redirect(response, location){
	response.writeHead(302, {'Location': location});
	response.end();
}
const server = http.createServer((request, response) => {
	if(request.method == 'POST') {
		let body = '';
		request.setEncoding('utf-8');
		request.on('data', (chunk) => {
			body += chunk;
		});
		request.on('end', () => {
			const postData = qs.parse(body);
			guestbookEntries.push(postData);
			redirect(response, '/');
		});
	}
	else if(request.method == 'GET') {
		const page = renderPage();
		send(response, page);
	}
});
server.listen(port, () => {console.log("The server is listening on port " + port);});
