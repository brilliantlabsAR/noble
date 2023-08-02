const { EventEmitter } = require('events');
const { inherits } = require('util');
const { resolve } = require('path');
const fs = require('fs');
const path = require('path');
const os = require('os');
const dir = resolve(__dirname, '..', '..');
let binding;

const arch = process.env.npm_config_arch || os.arch();
try {
  binding = getNodeBuild(dir);
} catch (error) {
  binding = require('node-gyp-build')(dir);
}
const { NobleMac } = binding;

inherits(NobleMac, EventEmitter);

module.exports = NobleMac;
function readdirSync(dir) {
  try {
    return fs.readdirSync(dir);
  } catch (err) {
    return [];
  }
}
function getBinary(dir) {
  const files = readdirSync(path.join(dir, 'build/Release')).filter((path) => {
    return path.includes(arch) || (path.includes('x64') && arch === 'x86_64');
  });
  return files[0] && path.join(dir, files[0]);
}

function getNodeBuild(dir) {
  return require(getBinary(dir));
}
