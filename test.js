const fs = require('fs');
const test = require('tape');
const path = require('path');
const yaml = require('js-yaml');
const glob = require('glob');

test('validate producers', t => {
  glob.sync(path.join(__dirname, 'block-producers', '*.yml')).forEach(filepath => {
    const config = yaml.safeLoad(fs.readFileSync(filepath, 'utf8'));
    const {name} = path.parse(filepath)
    const requiredFields = ['name', 'domain', 'http', 'p2p', 'telegram', 'keybase'];
    const optionalFields = ['website', 'logo'];

    // Required Fields
    requiredFields.forEach(field => {
      if (!config[field]) t.fail(`${name} missing ${field}`);
    })
    // Optional Fields
    optionalFields.forEach(field => {
      if (!config[field]) t.skip(`${name} missing ${field}`);
    })
  })
  t.end();
})