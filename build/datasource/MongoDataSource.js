"use strict";
exports.__esModule = true;
var Mongo = require("mongodb");
var MongoDataSource = (function () {
    function MongoDataSource() {
        this.MongoClient = Mongo.MongoClient;
    }
    MongoDataSource.prototype.init = function (callback) {
        this.MongoClient.connect(process.env.MONGO_URL, function (err, database) {
            if (err) {
                callback(err);
                return;
            }
            MongoDataSource.Database = database;
            callback(null);
        });
    };
    return MongoDataSource;
}());
exports.MongoDataSource = MongoDataSource;
//# sourceMappingURL=MongoDataSource.js.map