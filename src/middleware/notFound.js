module.exports = (req, res, next) => {
    var id = req.params.id;
    var db = require('../config/db')

    if (id) {
        db.execute('SELECT * FROM `todo` WHERE id = ?', [id], function(err, results, fields) {
            if (results.length > 0) {
                next();
            } else {
                res.status(404).json({"msg":"Not found"});
            }
        });
    } else {
        res.status(500).json({"msg":"internal server error"});
    }
};