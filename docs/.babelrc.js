const path = require('path');
const fs = require('fs');
const parentLoc = path.resolve(__dirname, '../.babelrc');

const parent = JSON.parse(fs.readFileSync(parentLoc));

parent.presets.push('@babel/preset-react');

module.exports = parent;
