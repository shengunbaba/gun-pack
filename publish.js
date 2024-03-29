const path = require('path');
const fs = require('fs');

const {copy} = require('./_node_modules/wu_/lib/utils');

const origin = path.join(__dirname, './_node_modules/wu_/lib');
const target = path.join(__dirname, './lib');


try {
    fs.accessSync(origin)
} catch (e) {
    fs.mkdirSync('lib');
}


copy(origin, target)
