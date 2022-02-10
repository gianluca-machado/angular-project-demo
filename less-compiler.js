// eslint-disable-next-line import/no-extraneous-dependencies
const less = require('less');

// eslint-disable-next-line import/no-extraneous-dependencies
const LessPluginCleanCSS = require('less-plugin-clean-css');
const fs = require('fs');

// ng zorro defined styles
const basicStyles = '@import \'./node_modules/ng-zorro-antd/ng-zorro-antd.less\';';

// ng zorro compact theme variables
const compactThemeVars = require('./node_modules/ng-zorro-antd/compact-theme');

// ng zorro dark theme variables
const darkThemeVars = require('./node_modules/ng-zorro-antd/dark-theme');

// ng zorro dark theme variables
const variables = require('./less-compile-variables');

// replace variables
const replaceVariables = (css, key) => {
  for (let i = 0; i < variables.toReplace[key].length; i++) {
    const before = variables.toReplace[key][i].to;
    const after = variables.toReplace[key][i].from;
    css = css.replace(before, after);
  }
  return css;
};

// add variables
const addVariables = (css, key) => {
  for (let i = 0; i < variables.toAdd[key].length; i++) {
    const value = variables.toAdd[key][i];
    css = `${css} ${value}`;
  }
  return css;
};

// write file
const writeFile = (css, key) => {
  fs.writeFileSync(variables.path[key], css);
};

// call process
const processData = (css, key) => {
  css = replaceVariables(css, key);
  css = addVariables(css, key);
  css = addVariables(css, 'variables');
  writeFile(css, key);
};

// render compact
less.render(`${basicStyles}`, {
  javascriptEnabled: true,
  plugins: [new LessPluginCleanCSS({
    advanced: true,
  })],
  modifyVars: {
    ...compactThemeVars,
    ...variables.toChange.compact,
  },
}).then((data) => {
  processData(data.css, 'compact');
}).catch((e) => {
  console.error(e);
});

// render dark
less.render(`${basicStyles}`, {
  javascriptEnabled: true,
  plugins: [new LessPluginCleanCSS({
    advanced: true,
  })],
  modifyVars: {
    ...darkThemeVars,
    ...variables.toChange.dark,
  },
}).then((data) => {
  processData(data.css, 'dark');
}).catch((e) => {
  console.error(e);
});
