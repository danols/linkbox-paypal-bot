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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Intent_1 = require("@maildots/sdk/component/Intent");
var SDKDataSource_1 = require("../datasource/SDKDataSource");
var AWS = require('aws-sdk');
var fs = require('fs');
//const Vision = require('@google-cloud/vision');
var GoogleVision_1 = require("../GoogleVision");
var S3_ACCESS_KEY_ID = 'AKIAIFC75OOWTULS5MUQ';
var S3_SECRET_ACCESS_KEY = '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';
var AnalyseImage = (function (_super) {
    __extends(AnalyseImage, _super);
    function AnalyseImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnalyseImage.prototype.execute = function (args) {
        var S3 = new AWS.S3({
            accessKeyId: S3_ACCESS_KEY_ID,
            secretAccessKey: S3_SECRET_ACCESS_KEY
        });
        var options = {
            Bucket: 'linkbox-attachments',
            Key: args.getMessage().attachments[0].attachment_key
        };
        var file = fs.createWriteStream(args.getMessage().attachments[0].attachment_name);
        var fileStream = S3.getObject(options).createReadStream();
        fileStream.pipe(file).on('finish', function () {
            return __awaiter(this, void 0, void 0, function () {
                var request, documentTextDetection, text, sdk, resultMsg;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            request = {
                                source: {
                                    filename: args.getMessage().attachments[0].attachment_name
                                }
                            };
                            return [4 /*yield*/, GoogleVision_1.vision.documentTextDetection(request)];
                        case 1:
                            documentTextDetection = _a.sent();
                            text = documentTextDetection[0].textAnnotations.reduce(function (str, idx) { return str += (idx.description + ''); }, '');
                            sdk = new SDKDataSource_1.SDKDataSource();
                            resultMsg = sdk.replyMsg(args.getMessage(), text);
                            fs.unlinkSync(args.getMessage().attachments[0].attachment_name);
                            return [2 /*return*/];
                    }
                });
            });
        });
    };
    return AnalyseImage;
}(Intent_1.Intent));
exports.AnalyseImage = AnalyseImage;
var AnalyseImageArgs = (function () {
    function AnalyseImageArgs(message) {
        this.message = message;
    }
    AnalyseImageArgs.prototype.getMessage = function () {
        return this.message;
    };
    return AnalyseImageArgs;
}());
exports.AnalyseImageArgs = AnalyseImageArgs;
//# sourceMappingURL=AnalyseImage.js.map