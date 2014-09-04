# Example setup for a new WordPress theme

[![Travis CI Build Status](https://travis-ci.org/thanhluu/wp-theme-setup.svg?branch=master)](https://travis-ci.org/thanhluu/wp-theme-setup)

Whenever I start developing a new project, it really takes me quite a lot of time to set up neccessary tools. In this repo, I would like to share the great tools which I have been using to build the WordPress themes. Plus, they were also standardized so that I totally develop the WordPress themes with high quality.

## List of tools

* [Travis CI](http://travis-ci.org) for automatically testing PHP codes, using [PHP_CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer) and [WordPress-Coding-Standard](https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards)
* [Grunt](http://gruntjs.com/) for compiling LESS to CSS, checking for JS errors, live reloading, concatenating and minifying files
* [Bower](http://bower.io/) for front-end package management
* [Gitignore](http://www.gitignore.io/) for determine which files and directories to ignore, before you make a commit
* [Editor Config](http://editorconfig.org/) for configuring the editor according to the same [standard](http://make.wordpress.org/core/handbook/coding-standards/php/#indentation)

## Theme development

This setup uses [Grunt](http://gruntjs.com/) for compiling LESS to CSS, checking for JS errors, live reloading, concatenating and minifying files.

### Install Grunt

**Unfamiliar with npm? Don't have node installed?** [Download and install node.js](http://nodejs.org/download/) before proceeding.

From the command line:

1. Install `grunt-cli` globally with `npm install -g grunt-cli`.
2. Navigate to the theme directory, then run `npm install`. npm will look at `package.json` and automatically install the necessary dependencies. It will also automatically run `bower install`, which installs front-end packages defined in `bower.json`.

When completed, you'll be able to run the various Grunt commands provided from the command line.

**Available Grunt commands:**

* `grunt dev` — Compile LESS to CSS, concatenate and validate JS
* `grunt watch` — Compile assets when file changes are made
* `grunt build` — Create minified assets that are used on non-development environments
* `grunt zip` — Export theme package for WordPress.org

### Running Travis CI

You want Travis CI to work, firstly, you need to sign in at [https://travis-ci.org/](https://travis-ci.org/) via your Github account. Then, just enable your projects by flicking the switch, and push new commit to Github.


### Editor Config
Regarding Sublime Text Editor, you can install a plugin named [Editor Config Sublime](https://github.com/sindresorhus/editorconfig-sublime) into Sublime via [Package Control](https://sublime.wbond.net/).
