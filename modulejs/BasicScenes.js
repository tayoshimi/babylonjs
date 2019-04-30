//import * as BABYLON from 'babylonjs';

//let BABYLON = require('babylonjs');
//let GUI = require('babylonjs-gui');
//let materials = require('babylonjs-materials');
 
export class CubeScene {
  constructor(canvas, engine) {
    this._canvas = canvas;
    this._engine = engine;
  }
  
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
  
  let faceColors = new Array(6);
  faceColors[4] = new BABYLON.Color4(1,0,0,1);   // red top
  faceColors[1] = new BABYLON.Color4(0,1,0,1);   // green front
  /*
  [...new Array(lineNum).keys()].forEach(j => {
	      const coefficient = 50 + j;
	      context.beginPath();
	      const h = Math.round(j / lineNum * 360); // 色相
        const s = 100; // 彩度
        const l = Math.round(j / lineNum * 100); // 明度
        context.strokeStyle = `hsl(${h}, ${s}%, ${l}%)`;
	      [...new Array(segmentNum).keys()].forEach(i => {
	        const x = i / (segmentNum - 1) * stageW;
	        const px = i / coefficient; // 横軸の入力値
	        const py = (j / 50 + time); // 時間の入力値
	        const y = amplitude * noise.perlin2(px, py) + stageH / 2;
	        if (i === 0) {
	          context.moveTo(x, y);
	        } else {
	          context.lineTo(x, y);
	        }
	      });
      context.stroke();
      });*/
  
  let options = {
    size: 2.0,
    faceColors : faceColors
  };
  
  let box = BABYLON.Mesh.CreateBox("Box",options,scene);
  
  // Move the sphere upward 1/2 its height
  box.position.y = 1;
  
  // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
  let ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
  
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


