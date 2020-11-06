// babel.config.js
module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}], "@babel/preset-react"],
  plugins: ["transform-class-properties", "transform-object-rest-spread", "@babel/plugin-proposal-object-rest-spread"],
};
