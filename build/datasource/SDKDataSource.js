"use strict";
exports.__esModule = true;
var SDK = require("@maildots/sdk");
var Promise = require("bluebird");
var SDKDataSource = (function () {
    function SDKDataSource() {
        this.msgClient = new SDK.MessageClient();
    }
    SDKDataSource.prototype.sendHiMsg = function (to_address) {
        var _this = this;
        return new Promise(function (resolve) {
            var to = new SDK.Receiver('', to_address);
            var content = 'Hello! 😎';
            var msg = new SDK.Message([to], content).subject('Paypal Bot');
            _this.msgClient.sendMessage(msg, function (data) {
                console.log("Message Sent: " + data.message_id);
                resolve(data);
            });
        });
    };
    SDKDataSource.prototype.replyMsg = function (refMsg, content) {
        var _this = this;
        return new Promise(function (resolve) {
            var reponseMsg = new SDK.Message([refMsg.from], content).subject('RE: Paypal-bot');
            _this.msgClient.replyTo(refMsg, reponseMsg, function (data) {
                //console.log("Reply Message: " + data.message_id)
                resolve(data);
            });
        });
    };
    return SDKDataSource;
}());
exports.SDKDataSource = SDKDataSource;
//# sourceMappingURL=SDKDataSource.js.map