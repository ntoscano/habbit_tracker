

This is an empty Readme. Each dependency, folder, and script should be explained as it is added.

The purpose of this repository is to provide core features to other projects. Core features including a development server, production server, and default components and file structure to serve as examples of best practices for other projects.


# Dependencies

* git - version control
* node - server side and bundling
* yarn - dependency management
* nvm - node version management
* webpack - build bundle
* lodash - utility library
* babel, babel-core, babel-loader - transpiles new JavaScript into plain JavaScript
* babel-preset-es2015, babel-preset-react, babel-preset-stage-0 - rules for babel
* react, react-dom - library for building user interfaces
* node-sass, sass-loader, css-loader - import and locally scope styles using SASS
* style-loader - inserts style using JavaScript
* classnames - combining strings for style class names
* extract-text-webpack-plugin - to combine styles into an external style-sheet
* html-webpack-plugin - generates base html file, inserting generated link and script tags
* url-loader, file-loader - copy images to asset folder or convert to base64 for image tags

# Change Log

## 0.0.6
Moved components and containers folders to app/ from app/scripts/. Handling images.

## 0.0.5
Generating index.html from a template. Generating webpack configs.

## 0.0.4
Added CSS Modules with SASS. Added webpack-dev-server for development.

## 0.0.3
Added the concept of containers, along with redux.

## 0.0.2
Added ReactJS and Babel. Converted component to a React Component. Supporting import from dependent projects.

## 0.0.1
