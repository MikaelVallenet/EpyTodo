var db = require('../../config/db');

exports.all_todo = function(res) {
    db.query('SELECT * FROM `todo`', function(err, results, fields) {
        res.status(200).json(results);
    });
}

exports.todo_id = function(res, id) {
    db.execute('SELECT * FROM `todo` WHERE id = ?', [id], function(err, results, fields) {
        res.status(200).json(results);
    });
}

exports.create_todo = function(res, title, description, duetime, id, status) {
    db.execute('INSERT INTO `todo` (title, description, due_time, status, user_id) VALUES (?, ?, ?, ?, ?)', [title, description, duetime, status, id], function(err, results, fields) {
        var id_task = results["insertId"];
        db.execute('SELECT * FROM `todo` WHERE id = ?', [id_task], function(err, results, fields) {
            res.status(200).json(results);
        });
    });
}

exports.delete_task_by_id = function(res, id) {
    db.execute('DELETE FROM `todo` WHERE id = ?', [id], function(err, results, fields) {
        res.status(200).json({"msg":`succesfully deleted record number: ${id}`});
    });
}

exports.update_task_by_id = function(res, id, title, desc, due_time ,user_id, status) {
    db.execute('UPDATE `todo` SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? WHERE id = ?', [title, desc, due_time, user_id, status, id], function(err, results, fields) {
        db.execute('SELECT id, title, description, created_at, due_time, user_id, status FROM todo WHERE id = ?', [id], function(err, results, fields) {
            res.status(200).json(results);
        });
    });
}