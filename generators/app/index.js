'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var mkdirp = require('mkdirp');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the always handy ' + chalk.red('graphite') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'What is your project\'s name?',
      default: this.appname
    },
    {
      type: 'input',
      name: 'username',
      message: 'What is your github username?'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.props.secret = Math.random().toString(36).slice(2);

      done();
    }.bind(this));
  },

  writing: {
    app: function () {

      // create project directory
      mkdirp(this.props.name);

      // change directory
      var dir = path.join(process.cwd(), this.props.name);
      process.chdir(dir);

      mkdirp('controllers');
      mkdirp('schema');

      this.fs.copy(
        this.templatePath('_graphql-controller.js'),
        this.destinationPath('controllers/graphql-controller.js')
      );

      this.fs.copyTpl(
        this.templatePath('_root.js'),
        this.destinationPath('schema/root.js'),
        this.props
      );

      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        this.props
      );

      this.fs.copyTpl(
        this.templatePath('_config.js'),
        this.destinationPath('config.js'),
        this.props
      );

      this.fs.copyTpl(
        this.templatePath('_README.md'),
        this.destinationPath('README.md'),
        this.props
      );

      this.fs.copy(
        this.templatePath('_app.js'),
        this.destinationPath('app.js')
      );

      this.fs.copy(
        this.templatePath('_routes.js'),
        this.destinationPath('routes.js')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('eslintrc'),
        this.destinationPath('.eslintrc')
      );

      this.fs.copy(
        this.templatePath('env'),
        this.destinationPath('.env')
      );

      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    }
  },

  install: function () {
    this.installDependencies({
      bower: false,
      npm: true,
      callback: function() {
        console.log('All done!')
      }
    });
  }
});
