/**
 * Created by michael on 2015/7/20.
 */
/**
 * Created by michael on 2015/6/10.
 */

'use strict';


define([
    'underscore',
    'ko',
    'three',
    'Detector',
    'OBJLoader',
    'OrbitControls',
    'dat-gui'
], function(
    _,
    ko
){
    var viewModel = function(){
        var self = this;
        self.template = "menu/template-tpl";

        self.myPostProcessingLogic = function(elements) {
            if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

            var camera, scene, renderer, light1, object, loader, controls;
            var params = {
                top: true
            };

            window.addEventListener( 'load', init );


            function init() {

                var container = document.getElementById('container');

                camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
                camera.position.z = 400;
                camera.position.x = 100;
                camera.position.y = 20;
                camera.target = new THREE.Vector3();

                // scene


                scene = new THREE.Scene();


                //loader
                var loader = new THREE.OBJLoader( manager );
                loader.load( 'obj/test/ex/ex-2.obj', function ( object ) {

                    object.position.y = - 8;
                    scene.add( object );
                }, onProgress, onError );

                //set directional light
                //1
                var ambient1 = new THREE.AmbientLight( 0x000000 );
                scene.add( ambient1 );
                var directionalLight = new THREE.DirectionalLight( 0x444444 );
                directionalLight.position.set( 0, 0, 1 );
                scene.add( directionalLight );
                //2
                var ambient2 = new THREE.AmbientLight( 0x000000 );
                scene.add( ambient2 );
                var directionalLight = new THREE.DirectionalLight( 0x444444 );
                directionalLight.position.set( 0, 0, -1 );
                scene.add( directionalLight );
                //3
                var ambient3 = new THREE.AmbientLight( 0x000000 );
                scene.add( ambient3 );
                var directionalLight = new THREE.DirectionalLight( 0x444444 );
                directionalLight.position.set( 0, 1, 0 );
                scene.add( directionalLight );
                //4
                var ambient4 = new THREE.AmbientLight( 0x900000 );
                scene.add( ambient4 );
                var directionalLight = new THREE.DirectionalLight( 0x444444 );
                directionalLight.position.set( 0, -1, 0 );
                scene.add( directionalLight );

                //create point light
                var sphere = new THREE.SphereGeometry( 0.3, 16, 8 );
                //light1
                light1 = new THREE.PointLight( 0xff0040, 2, 20 );
                light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) ) );
                scene.add( light1 );

                var manager = new THREE.LoadingManager();
                manager.onProgress = function ( item, loaded, total ) {
                    console.log( item, loaded, total );
                };


                var onProgress = function ( xhr ) {
                    if ( xhr.lengthComputable ) {
                        var percentComplete = xhr.loaded / xhr.total * 100;
                        console.log( Math.round(percentComplete, 2) + '% downloaded' );
                    }
                };

                var onError = function ( xhr ) {
                };


                //renderer setting
                renderer = new THREE.WebGLRenderer();
                renderer.setPixelRatio( window.devicePixelRatio );
                renderer.setSize( window.innerWidth, window.innerHeight );
                container.appendChild( renderer.domElement );
                //renderer.shadowMapEnabled = true;

                //control
                controls = new THREE.OrbitControls( camera, renderer.domElement );
                controls.minDistance = 50;
                controls.maxDistance = 600;

                //add gui
                var gui = new dat.GUI();
                gui.add( params, 'top');
                gui.open();

                //change with windows size
                window.addEventListener( 'resize', onWindowResize, false );

                //animate
                animate();

            }


            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize( window.innerWidth, window.innerHeight );
            }

            function animate() {

                requestAnimationFrame( animate );
                render();

            }

            function render() {

                var time = Date.now() * 0.0005;

                light1.position.x = 50;
                light1.position.y = 5;
                light1.position.z = 20;

                camera.lookAt( scene.position );
                renderer.render( scene, camera );

            }
        };
    };

    return viewModel;
});
