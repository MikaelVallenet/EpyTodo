var db = require('../../config/db');
const jwt = require('jsonwebtoken');

exports.all_user = function(res, id) {
    db.query('SELECT * FROM `user`', function(err, results, fields) {
        res.status(200).json(results);
    });
}

exports.all_todo = function(res, id) {
    db.query('SELECT * FROM todo WHERE user_id = ?', [id], function(err, results, fields) {
        res.status(200).json(results);
    })
}

exports.register = function(res, mail, pwd, mname, fname) {
    db.execute('INSERT INTO `user` (email, password, name, firstname) VALUES (?, ?, ?, ?)', [mail, pwd, mname, fname], function(err, results, fields) {
        const token = jwt.sign({email:mail, password:pwd}, 'SECRET');
        res.status(200).json({token});
    })
}

exports.check_account_mname = function(res, mname, callback) {
    db.execute('SELECT * FROM `user` WHERE name = ?', [mname], function(err, results, fields) {
        if (results.length > 0) {
            callback(84);
        } else {
            callback(0);
        }
    })
}

exports.check_account_mail = function(res, mail, callback) {
    db.execute('SELECT * FROM `user` WHERE email = ?', [mail], function(err, results, fields) {
        if (results.length > 0) {
            callback(84);
        } else {
            callback(0);
        }
    })
}

exports.get_mail_account = function(res, mail, pwd, bcrypt, callback) {
    db.execute('SELECT password, id FROM `user` WHERE email = ?', [mail], function(err, results, fields) {
        if (results.length > 0) {
            var pwd2 = results[0].password;
            var id2 = results[0].id;
            if (bcrypt.compareSync(pwd, pwd2)) {
                const token = jwt.sign({email:mail, id:id2}, 'SECRET');
                res.json({token});
                callback(0);
            } else {
                callback(84);
            }
        } else {
            callback(84);
        }
    })
}

exports.get_info_id_or_mail = function(res, data) {
    db.execute('SELECT * FROM user WHERE email = ?', [data], function(err, results, fields) {
        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            db.execute('SELECT * FROM user WHERE id = ?', [data], function(err, results, fields) {
                res.status(200).json(results);
            });
        }
    });
}

exports.delete_user_by_id = function(res, id) {
    db.execute('DELETE FROM `user` WHERE id = ?', [id], function(err, results, fields) {
        res.status(200).json({"msg":`succesfully deleted record number: ${id}`});
    });
}

exports.update_user_by_id = function(res, id, email, pwd, mname, fname) {
    db.execute('UPDATE `user` SET email = ?, password = ?, name = ?, firstname = ? WHERE id = ?', [email, pwd, mname, fname, id], function(err, results, fields) {
        db.execute('SELECT id, email, password, created_at, firstname, name FROM user WHERE id = ?', [id], function(err, results, fields) {
            res.status(200).json(results);
        });
    });
}