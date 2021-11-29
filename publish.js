const path = require('path');
const fs = require('fs');

const {copy} = require('./_node_modules/gun-pack/lib/utils');

const origin = path.join(__dirname, './_node_modules/gun-pack/lib');
const target = path.join(__dirname, './lib');


try {
    fs.accessSync(origin)
} catch (e) {
    fs.mkdirSync('lib');
}


copy(origin, target)
