"use strict";
exports.__esModule = true;
var Crypto = require("crypto");
var Util = (function () {
    function Util() {
    }
    Util.encrypt = function (plain_text) {
        var cipher = Crypto.createCipher('aes-256-cbc', 'nPDcVf356aN0wT52YIshPJYioi1srwsP');
        var cipher_text = cipher.update(plain_text, 'utf8', 'hex');
        cipher_text += cipher.final('hex');
        return cipher_text;
    };
    Util.decrypt = function (cipher_text) {
        var decipher = Crypto.createDecipher('aes-256-cbc', 'nPDcVf356aN0wT52YIshPJYioi1srwsP');
        var plain_text = decipher.update(cipher_text, 'hex', 'utf8');
        plain_text += decipher.final('utf8');
        return plain_text;
    };
    return Util;
}());
exports.Util = Util;
//# sourceMappingURL=Util.js.map