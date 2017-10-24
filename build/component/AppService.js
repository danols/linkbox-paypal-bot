"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var AppService = (function () {
    function AppService() {
        var _this = this;
        this.port = process.env.PORT || '';
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.listen(this.port, function (err) { return _this.onStartServer(err); });
        this.app.get('/index', function (req, res) { return _this.onRequestIndex(req, res); });
        //Here you have to write your service routes
    }
    AppService.prototype.onStartServer = function (err) {
        console.log("App listening on port " + this.port);
    };
    AppService.prototype.onRequestIndex = function (req, res) {
        res.sendStatus(200).end();
    };
    return AppService;
}());
exports.AppService = AppService;
//# sourceMappingURL=AppService.js.map