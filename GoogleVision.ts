const Vision = require('@google-cloud/vision');

const vision = Vision({
    projectId: 'maildots-ae880',
    keyFilename: 'maildots_cloud.json'
});

export { vision };
