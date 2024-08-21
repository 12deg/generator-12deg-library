module.exports = { 
  appname: "@dzangolab/generator-library",
  buildCommand: () => null,
  publishCommand: () => {
    return "npm publish --access public";
  },
};
