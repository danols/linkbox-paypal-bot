"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var BaseComponent_1 = require("@maildots/sdk/component/BaseComponent");
var SayHello_1 = require("../intent/SayHello");
var AnalyseImage_1 = require("../intent/AnalyseImage");
var Index = (function (_super) {
    __extends(Index, _super);
    function Index() {
        return _super.call(this) || this;
    }
    Index.prototype.onNewMessage = function (message) {
        //console.log(JSON.stringify(message, null, 2))
        if (message.attachments.length > 0) {
            var args = new AnalyseImage_1.AnalyseImageArgs(message);
            this.analyseImage = new AnalyseImage_1.AnalyseImage();
            this.analyseImage.execute(args);
        }
    };
    Index.prototype.onInstall = function (user) {
        var args = new SayHello_1.SayHelloArgs(user);
        this.sayHello = new SayHello_1.SayHello();
        this.sayHello.execute(args);
    };
    Index.prototype.onUninstall = function (user) {
    };
    Index.prototype.onCommand = function (data) {
        switch (data.data) {
            case '/Command-1':
                break;
            case '/Command-2':
                break;
            default:
        }
    };
    Index.prototype.onCall = function (data) {
    };
    Index.prototype.onInteraction = function (data) {
        switch (data.input[0].id) {
            case "SyncChannelForm":
                break;
            default:
                console.log("Unknown Interaction");
                break;
        }
    };
    return Index;
}(BaseComponent_1.BaseComponent));
exports.Index = Index;
//# sourceMappingURL=Index.js.map