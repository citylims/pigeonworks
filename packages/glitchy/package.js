Package.describe({
  name: 'pigeonworks:glitchy',
  version: '0.0.1',
  summary: '',
  git: '',
  documentation: 'README.md'
});

Npm.depends({
  glslify: '6.1.1',
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.4.1');
  api.use('ecmascript');
  api.use('tracker');
  api.use('templating', 'client');
  api.mainModule('glitchy.js');
  api.addFiles([
    'client/glitchy.html',
    'client/glitchy.js'
  ], 'client');
  api.addAssets([
    'glsl/glitchEffect.fs',  
    'glsl/glitchEffect.vs', 
    'glsl/glitchImage.fs',  
    'glsl/glitchImage.vs'  
  ], ['client', 'server']);
  api.addFiles([
    'server/glitchImage.js',
    'server/glitchEffect.js'
  ], 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('pigeonworks:glitchy');
  api.mainModule('glitchy-tests.js');
});
