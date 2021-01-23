// babel.config.js
module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}], "@babel/preset-react"],
  plugins: ["transform-class-properties", "@babel/plugin-proposal-object-rest-spread"],
};
