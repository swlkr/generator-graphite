'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('graphite:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({ name: "graphite", username: "swlkr" })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      '.gitignore',
      '.env',
      '.eslintrc',
      'package.json',
      'app.js',
      'routes.js',
      'README.md'
    ]);
  });
});
