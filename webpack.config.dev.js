const path = require('path');
const makeWebpackConfig = require('./app/makeWebpackConfig');

const options = {};

const plainConfig = makeWebpackConfig(options);
const devConfigOverrides = makeWebpackConfig.makeDevConfigOverrides(plainConfig, options);
module.exports = devConfigOverrides;
