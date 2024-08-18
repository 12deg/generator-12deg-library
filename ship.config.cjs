module.exports = { 
  appname: "@dzangolab/generator-package-monorepo",
  buildCommand: () => null,
  publishCommand: ({ isYarn, tag, defaultCommand, dir }) => {
    return "npm publish --access public";
  },
};
