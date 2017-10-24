"use strict";
exports.__esModule = true;
var Vision = require('@google-cloud/vision');
var vision = Vision({
    projectId: 'maildots-ae880',
    keyFilename: 'maildots_cloud.json'
});
exports.vision = vision;
console.log('vision');
//# sourceMappingURL=GoogleVision.js.map