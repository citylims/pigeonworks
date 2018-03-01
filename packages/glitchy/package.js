Package.describe({
  name: 'pigeonworks:glitchy',
  version: '0.0.1',
  summary: '',
  git: '',
  documentation: 'README.md'
});

Npm.depends({
  glslify: '6.1.1',
  three: '0.90.0'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.4.1');
  api.use('ecmascript');
  api.use('tracker');
  api.use('templating', 'client');
  api.mainModule('glitchy.js');
  api.addFiles([
    'client/glitchy.html',
    'client/glitchy.js',
    'client/glitchImage.js',
    'client/glitchEffect.js'
  ], 'client');
  api.addAssets([
    'private/glsl/glitchEffect.fs',  
    'private/glsl/glitchEffect.vs', 
    'private/glsl/glitchImage.fs',  
    'private/glsl/glitchImage.vs',
    'img/DeepSpace.png'  
  ], ['client', 'server']);
  api.addFiles([
    'server/shaders.js',
  ], 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('pigeonworks:glitchy');
  api.mainModule('glitchy-tests.js');
});
