const {create_todo, all_todo, todo_id, delete_task_by_id, update_task_by_id} = require('./todos.query');
const auth = require('../../middleware/auth');
const verif_id = require('../../middleware/notFound');

module.exports = function(app, bcrypt) {
    app.get('/todo', auth, (req, res) => {
        all_todo(res);
    });
    app.get('/todo/:id', auth, verif_id, (req, res) => {
        var id = req.params.id;

        todo_id(res, id);
    });
    app.post('/todo', auth, (req, res) => {
        var title = req.body["title"];
        var description = req.body["description"];
        var due_time = req.body["due_time"];
        var my_id = req.body["user_id"];
        var status = req.body["status"];

        if (title === undefined || description === undefined  ||
        due_time === undefined || my_id === undefined || status === undefined) {
            res.status(500).json({"msg":"internal server error"});
            return;
        }
        create_todo(res, title, description, due_time, my_id, status);
    });
    app.delete('/todo/:id', auth, (req, res) => {
        var id = req.params.id;

        delete_task_by_id(res, id);
    });
    app.put('/todo/:id', auth, (req, res) => {
        var id = req.params.id;
        var title = req.body["title"];
        var desc = req.body["description"];
        var due_time = req.body["due_time"];
        var user_id = req.body["user_id"];
        var status = req.body["status"];

        if (id === undefined || title === undefined || desc === undefined  ||
        due_time === undefined || user_id === undefined ||
        status === undefined) {
            res.status(500).json({"msg":"internal server error"});
            return;
        }
        update_task_by_id(res, id, title, desc, due_time, user_id, status);
    })
}