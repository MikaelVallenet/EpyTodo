const {all_user, all_todo, get_info_id_or_mail, delete_user_by_id, update_user_by_id} = require('./user.query');
const auth = require('../../middleware/auth');

module.exports = function(app, bcrypt) {
    app.get('/user', auth, (req, res) => {
        all_user(res);
    });
    app.get('/user/todos', auth, (req, res) => {
        all_todo(res, req.user);
    });
    app.get('/user/:data', auth, (req, res) => {
        var data = req.params.data;

        get_info_id_or_mail(res, data);
    });
    app.delete('/user/:id', auth, (req, res) => {
        var id = req.params.id;

        delete_user_by_id(res, id);
    });
    app.put('/user/:id', auth, (req, res) => {
        var id = req.params.id;
        var mail = req.body["email"];
        var mname = req.body["name"];
        var fname = req.body["firstname"];
        var pwd = req.body["password"];

        if (id === undefined || mail === undefined || mname === undefined  ||
        fname === undefined || pwd === undefined) {
            res.status(500).json({"msg":"internal server error"});
            return;
        }
        pwd = bcrypt.hashSync(pwd, 10);
        update_user_by_id(res, id, mail, pwd, mname, fname);
    });
}