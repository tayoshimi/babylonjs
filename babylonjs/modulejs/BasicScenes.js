/**
 * Babylonjsによる比較的シンプルなシーン集
 * @example import { CubeScene } from '../modulejs/BasicScenes.js';
 * @note insert <script type="module"> ... </script>
 */

//import * as BABYLON from 'babylonjs';
import { hsl2rgb } from './hsl2rgb.js';

/**
 * 正方形を表示するシーン
 */
export class CubeScene {
  constructor(canvas, engine) {
    this._canvas = canvas;
    this._engine = engine;
  }
  
  toString() {
        return `{x:${this._canvas}, y:${this._engine}}`;
    }
  
  createScene() {
    let scene = new BABYLON.Scene(this._engine);  
    
    const camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
      camera.setPosition(new BABYLON.Vector3(0, 10, 20));
      
    camera.setTarget(new BABYLON.Vector3(0, 0, 0));
    
    /*let camera = new BABYLON.ArcRotateCamera("arcCam",
              BABYLON.Tools.ToRadians(45),
              BABYLON.Tools.ToRadians(45),
              20.0,box.position,scene);*/

    camera.attachControl(this._canvas,true);

    let light = new BABYLON.PointLight("pointLight",new BABYLON.Vector3(
      0,10,0),scene);
    light.parent = camera;
    light.diffuse = new BABYLON.Color3(1,1,1);
    
    var faceColors = new Array(6);
    //[...new Array(faceColors).keys()].forEach(i => {
    for(var i = 0; i < 6; i++) {
      // hsl表色系で色をランダムに作成
      const h = Math.random() * 360; // 色相
      const s = 100; // 彩度
      const l = 60; // 明度
      const rgb = hsl2rgb(h, s, l);
      const color = new BABYLON.Color4.FromInts(rgb.r,rgb.g,rgb.b, 255);
      
      faceColors[i] = color;
      
    } //);
    
    let options = {
      size: 4,
      faceColors : faceColors
    };
    
    let box = BABYLON.MeshBuilder.CreateBox("box", options, scene);
    box.material = new BABYLON.StandardMaterial("mat", scene);
    
    //box.material.diffuseColor = new BABYLON.Color4(1.0, 1.0, 1.0, 1.0);
    //box.material.emmisiveColor = new BABYLON.Color4(1.0, 1.0, 1.0, 1.0);
    
    return scene;
    
  }
}


export class SphereScene {
  constructor(canvas, engine) {
    this._canvas = canvas;
    this._engine = engine;
  }
  
  // debug function
  toString() {
        return `{x:${this._canvas}, y:${this._engine}}`;
    }
  
  //let createScene = function () {
  createScene() {
  //let createCubeScene = (canvas, engine) => {
  
  // This creates a basic Babylon Scene object (non-mesh)
  
  let scene = new BABYLON.Scene(this._engine);
  
  // This creates and positions a free camera (non-mesh)
  let camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
  
  // This targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());
  
  // This attaches the camera to the canvas
  camera.attachControl(this._canvas, true);
  
  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
  
  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;
  
  // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
  let sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
  
  // Move the sphere upward 1/2 its height
  sphere.position.y = 1;
  
  // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
  let ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
  
  return scene;
  
  }
}


