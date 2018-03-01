import THREE from 'three';
import GlitchImage from './glitchImage.js';
// import PostEffect from '../modules/sketch/glitch/PostEffect.js';
import GlitchEffect from './glitchEffect.js';


Template.glitchy.onCreated(function() {
  // this.loaded = false
  
});

Template.glitchy.onRendered(function() {
    var baseUrl = window.location.href;
    console.log(baseUrl)
    const canvas = document.getElementById('canvas-webgl');
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      canvas: canvas,
    });
    const renderBack1 = new THREE.WebGLRenderTarget(document.body.clientWidth, window.innerHeight);
    const scene = new THREE.Scene();
    const sceneBack = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const cameraBack = new THREE.PerspectiveCamera(45, document.body.clientWidth / window.innerHeight, 1, 10000);
    const clock = new THREE.Clock();

    const vectorTouchStart = new THREE.Vector2();
    const vectorTouchMove = new THREE.Vector2();
    const vectorTouchEnd = new THREE.Vector2();

    let isDrag = false;

    //
    // process for this sketch.
    //
    var bgImg;
    var glitchEffect;
    var foo = new GlitchImage();
    foo.then((res) => {
      console.log(res);
      bgImg = res;
      console.log(bgImg);
      var bar = new GlitchEffect(renderBack1.texture);
      bar.then((res) => {
        console.log(res);
        glitchEffect = res;
          const resizeWindow = () => {
            canvas.width = document.body.clientWidth;
            canvas.height = window.innerHeight;
            cameraBack.aspect = document.body.clientWidth / window.innerHeight;
            cameraBack.updateProjectionMatrix();
            bgImg.resize();
            glitchEffect.resize();
            renderBack1.setSize(document.body.clientWidth, window.innerHeight);
            renderer.setSize(document.body.clientWidth, window.innerHeight);
          }
          const render = () => {
            const time = clock.getDelta();
            renderer.render(sceneBack, cameraBack, renderBack1);
            glitchEffect.render(time);
            renderer.render(scene, camera);
          }
          const renderLoop = () => {
            render();
            requestAnimationFrame(renderLoop);
          }
          const touchStart = (isTouched) => {
            isDrag = true;
          };
          const touchMove = (isTouched) => {
            if (isDrag) {}
          };
          const touchEnd = (isTouched) => {
            isDrag = false;
          };
          const on = () => {
            window.addEventListener('resize', GlitchyApi.debounce(() => {
              resizeWindow();
            }), 1000);
            canvas.addEventListener('mousedown', function (event) {
              event.preventDefault();
              vectorTouchStart.set(event.clientX, event.clientY);
              GlitchyApi.normalizeVector2(vectorTouchStart);
              touchStart(false);
            });
            document.addEventListener('mousemove', function (event) {
              event.preventDefault();
              vectorTouchMove.set(event.clientX, event.clientY);
              GlitchyApi.normalizeVector2(vectorTouchMove);
              touchMove(false);
            });
            document.addEventListener('mouseup', function (event) {
              event.preventDefault();
              vectorTouchEnd.set(event.clientX, event.clientY);
              GlitchyApi.normalizeVector2(vectorTouchEnd);
              touchEnd(false);
            });
            canvas.addEventListener('touchstart', function (event) {
              event.preventDefault();
              vectorTouchStart.set(event.touches[0].clientX, event.touches[0].clientY);
              GlitchyApi.normalizeVector2(vectorTouchStart);
              touchStart(event.touches[0].clientX, event.touches[0].clientY, true);
            });
            canvas.addEventListener('touchmove', function (event) {
              event.preventDefault();
              vectorTouchMove.set(event.touches[0].clientX, event.touches[0].clientY);
              GlitchyApi.normalizeVector2(vectorTouchMove);
              touchMove(true);
            });
            canvas.addEventListener('touchend', function (event) {
              event.preventDefault();
              vectorTouchEnd.set(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
              GlitchyApi.normalizeVector2(vectorTouchEnd);
              touchEnd(true);
            });
          }

          this.init = () => {
            renderer.setSize(document.body.clientWidth, window.innerHeight);
            renderer.setClearColor(0x555555, 1.0);
            cameraBack.position.set(1000, 1000, 1000);
            cameraBack.lookAt(new THREE.Vector3());
            
            bgImg.init(() => {
              sceneBack.add(bgImg.obj);
              scene.add(glitchEffect.obj);
            })

            on();
            resizeWindow();
            renderLoop();
          }
        this.init();
      });
    });
    // const bgImg = new GlitchImage();
    
    // const glitchEffect = new GlitchEffect(renderBack1.texture);
    

    //
    // common process
    //
  
  // }
});


