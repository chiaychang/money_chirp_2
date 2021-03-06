var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {

    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        
        // res.json("/members");
        res.json("/following");
        

        
    });


    app.post("/api/signup", function(req, res) {
        console.log(req.body);

        db.User.create({
            email: req.body.email,
            password: req.body.password
        }).then(function() {
            res.redirect(307, '/api/login');
        }).catch(function(err) {
            console.log(err);
        });
    });

    //not in use at the moment
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });

    app.get("/api/user_data", function(req, res) {
        if (!req.user) {
            res.json({});
        } else {
            // res.json({
            // 	email: req.user.email,
            // 	id: req.user.id
            // });
            console.log(req.user.email);
            console.log(req.user.id);

        }
    });

    //how to delete an account//
    app.post("/api/delete/", function(req, res) {
        console.log("this is from delete API" + req.user.id);
        db.User.destroy({
            where: {
                id: req.user.id
            }
        }).then(function() {
            console.log("user account deleted");
            req.logout();
            res.redirect("/");

        });

    });
};
