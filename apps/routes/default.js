var router = require('express').Router();
router.use('/', function (req, res, next) {
    if (req.url == '/') {
        res.render('index.html', { title: 'Home Page' });
    } else {
        res.writeHead(404);
        res.end();
    }
});
module.exports.router = router;
