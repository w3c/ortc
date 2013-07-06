
const PATH = require("path");
const EXPRESS = require("express");

const PORT = 8081;

exports.main = function(callback) {
    try {
        var app = EXPRESS();

        app.use(EXPRESS.bodyParser());

        mountStaticDir(app, /^\/ui\/(.*)$/, PATH.join(__dirname, "../ortc-over-rtc/ui"));
        mountStaticDir(app, /^\/lib\/(.*)$/, PATH.join(__dirname, "../ortc-over-rtc/lib"));
        mountStaticDir(app, /^(\/.*)$/, __dirname);

        var server = app.listen(PORT);

        console.log("open http://localhost:" + PORT + "/");

        return callback(null, {
            server: server,
            port: PORT
        });

    } catch(err) {
        return callback(err);
    }
};


function mountStaticDir(app, route, path) {
    app.get(route, function(req, res, next) {
        var originalUrl = req.url;
        req.url = req.params[0];
        EXPRESS.static(path)(req, res, function() {
            req.url = originalUrl;
            return next.apply(null, arguments);
        });
    });
}


if (require.main === module) {
    exports.main(function(err) {
        if (err) {
            console.error(err.stack);
            process.exit(1);
        }
    });
}
