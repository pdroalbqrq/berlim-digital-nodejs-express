const router = require('express').Router();


router.get('/', function (req, res, next) {
    res.status(200).send({
        title: "Node Express API - Berlim Digital",
        version: "0.0.1",
        created_by: 'Pedro Chiappetta'
    });
});

module.exports = router;