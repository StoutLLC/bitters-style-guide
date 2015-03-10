# Bitters Style Guide #

### What is this repository for? ###

This repository provides an efficient means of creating and editing a style guide, and then implementing the style guide into other projects.
To use this repository, fork/clone it into a repository of your own, and edit the scss files inside of the `src/css` folder.

This project is based off of [Bitters](https://github.com/thoughtbot/bitters) and [Bourbon](https://github.com/thoughtbot/bourbon), a project by ThoughtBot.

### Installation ###

The first step is to fork/clone the repository into one of your own.

Inside of the repo's root directory, run `npm install` and `bower install` to install the dependencies.

### How to use it ###

When you're ready to start developing, run `grunt serve`. This will serve up a demonstration page, utilizing the style guide. Edit the SCSS files that begin with '_'
to edit your style guide. Edit `index.html` to see how your style guide affects different DOM elements. Edit `evaluation.scss` to add other resources that you would like to test against.
For example, if your project is already built off of bootstrap, include bootstrap before your style guide to see how it will affect your styles.

When you would like to build the project, run `grunt build`. This will compile your SCSS into standard CSS, inside of the `dist` folder.
It will also copy your style guide SCSS files to the dist folder.

Then, it if you are using Bower, include your style guide's git repo as a Bower dependency. This helps disjoint your style guide from your other projects, as well
as allowing for easy updating.

To use the style guide in a SASS project, first import Bourbon in your main stylesheet file.
After that, import `your-style-guide/dist/base`.

To use it in a non-SASS project, instead import `dist/style-guide.min.css` to your project.

### Dependencies ###
* Bourbon

### Dev Dependencies ###
* Node.js + NPM
* Bower
* Grunt (`npm install -g grunt-cli`)

* express
* grunt-concurrent
* grunt-contrib-clean
* grunt-contrib-copy
* grunt-contrib-cssmin
* grunt-contrib-watch
* grunt-contrib-sass
* grunt-express-server
* jit-grunt
* time-grunt
* connect-livereload
* grunt-open

###### For style testing purposes
* font-awesome
* bootstrap-sass

### Contribution guidelines ###

Please try to conform to [these](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit-message-format) guidelines.

### Questions? ###

Please ask all non-bug related questions on the [GitHub Issues](https://github.com/Awk34/bitters-style-guide/issues) page, starting the title with "QUESTION: "
