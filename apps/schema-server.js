var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');

http.createServer(function (req, res) {
    var url_parts = url.parse(req.url, true);
    var uri = url.parse(req.url).pathname;
    var db = typeof url_parts.query.db == 'undefined' ? 'MembershipPlus' : url_parts.query.db;
    var filename = path.join(process.cwd(), 'services/proxies/' + db + '/schema' + uri + ".json");
    console.log("file:" + filename);
    path.exists(filename, function (exists) {
        try {
            if (!exists) {
                console.log("not found: " + filename);
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.write('404 Not Found\n');
                res.end();
            } else {
                var mimeType = "application/schema+json";
                if (typeof url_parts.query.subdoc == 'undefined') {
                    res.writeHead(200, mimeType);
                    var fileStream = fs.createReadStream(filename);
                    fileStream.pipe(res);
                } else {
                    fs.readFile(filename, "utf8", function (err, data) {
                        if (err)
                            throw err;
                        sarr = JSON.parse(data);
                        var found = false;
                        for (var i = 0; i < sarr.length; i++) {
                            if (sarr[i].id == url_parts.query.subdoc) {
                                res.writeHead(200, mimeType);
                                res.write(JSON.stringify(sarr[i]));
                                res.end();
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            console.log("schema not found: '" + url_parts.query.subdoc + "' in " + filename);
                            res.writeHead(200, { 'Content-Type': 'text/plain' });
                            res.write('404 Not Found\n');
                            res.end();
                        }
                    });
                }
            }
        }
        catch (ex) {
            console.log(ex.message);
        }

    }); //end path.exists
}).listen(11333);
console.log("json schema server started, port = 11333.");
