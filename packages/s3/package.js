Package.describe({
  name: 'pigeonworks:s3',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({
  'aws-sdk': '2.4.9',
  's3-ls': '2.0.1'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.4.1');
  api.use('ecmascript');
  api.use('edgee:slingshot')
  api.mainModule('s3.js');
  api.addFiles([
    'server/methods.js',
  ], 'server');
});