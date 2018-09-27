var http = require('http');
var fs = require('fs');

function start() {
  function onRequest(request, response) {
    console.log("Odebrano zapytanie.");
    if (request.url === '/assets/css/style.css') {
        console.log("Jak odczytac plik?");
        response.writeHead(200, {'Content-type' : 'text/css'});
        var fileContents = fs.readFileSync('./assets/css/style.css', {encoding: 'utf8'});
        response.write(fileContents);
        response.end();
      }

    fs.readFile('./index.html', function(err, html) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);
        response.end();
    })
  }

  http.createServer(onRequest).listen(9000);

  console.log("Uruchomiono serwer!");
}

exports.start = start;