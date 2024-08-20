module.exports = { 
  appname: "@dzangolab/generator-package-monorepo",
  buildCommand: () => null,
  publishCommand: () => {
    return "npm publish --access public";
  },
};
