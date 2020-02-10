const devKeys = require('./keys.dev.js');
const prodKeys = require('./keys.prod.js');

if(process.env.NODE_ENV === 'development'){
    module.exports = devKeys;
} else {
    module.exports = prodKeys;
}