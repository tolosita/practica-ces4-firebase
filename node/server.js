var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

function send404(response) {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.write('Error 404: Resource not found.');
    response.end();
}

var mimeLookup = {
    '.js': 'application/javascript',
    '.html': 'text/html'
};

http.createServer(function (req, res) {
    var q = url.parse(req.url, true).query;

    if (q.Status === undefined) {
        if (req.method == 'GET') {
            var fileurl = '/index.html';
            if (req.url == '/')
                fileurl = '/index.html';
            else
                fileurl = req.url;
            var filepath = path.resolve('./page' + fileurl);

            var fileExt = path.extname(filepath);
            var mimeType = mimeLookup[fileExt];
            if (!mimeType) {
                send404(res);
                return;
            }
            fs.exists(filepath, function (exists) {
                if (!exists) {
                    send404(res);
                    return;
                };
                res.writeHead(200, { 'content-type': mimeType });
                fs.createReadStream(filepath).pipe(res);
            });
        } else {
            send404(res);
        }
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`<title>${q.Status}</title>`);
        res.write(`<h1>${q.Message}</h1>`);
        res.write('<button><a href="/">back</a></button>');
        return res.end();
    }
}).listen(3030);