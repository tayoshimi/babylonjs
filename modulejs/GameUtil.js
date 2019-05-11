/**
 * Babylonjsによるゲーム用ユーティリティ集
 * @example import { CubeScene } from '../modulejs/GameUtil.js';
 * @note insert <script type="module"> ... </script>
 */
//import * as BABYLON from 'babylonjs';

import { hsl2rgb } from './hsl2rgb.js';

/**
 * ゲーム用ユーティリティ
 */
export default class GameUtil {
  /*constructor(canvas, engine) {
    this._canvas = canvas;
    this._engine = engine;
  }*/
 
  /**
    * Return  a random number[0 - n]
    * @param n
    */
  static Rand(n) {
      return Math.floor(Math.random() * n);
  }
  
   /**
    * Return  a random number[0 - n]
    * @param n
    */
  static RandColor4(n) {
      return Math.floor(Math.random() * n);
  }
  
  /**
   * Creates a starfield skybox
   * @param scene
   * @return skybox
   */
  static CreateStarfieldSkybox(scene) {
    let skybox = BABYLON.MeshBuilder.CreateBox("starfieldBox", { size: 1000.0 }, scene);
    let starfieldPT = new BABYLON.StarfieldProceduralTexture("starfieldPT", 512, scene);
    let starfieldMaterial = new BABYLON.StandardMaterial("starfield", scene);
    starfieldMaterial.diffuseTexture = starfieldPT;
  starfieldMaterial.diffuseTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    starfieldMaterial.backFaceCulling = false;
    starfieldPT.beta = 0.1;
    skybox.material = starfieldMaterial;
    scene.registerBeforeRender(() => {
        starfieldPT.time += scene.getAnimationRatio() * 0.02;
    });
    return skybox;
  }
  
  /**
   * Creates a bluesky skybox
   * @param scene
   * @return skybox
   */
  static CreateBlueSkybox(scene) {
    let skybox = BABYLON.MeshBuilder.CreateSphere("cloudBox", { segments: 100, diameter: 1000 }, scene);
    skybox.position = new BABYLON.Vector3(0, 0, 12);
    let cloudPT = new BABYLON.CloudProceduralTexture("cloudPT", 1024, scene);
    let cloudMaterial = new BABYLON.StandardMaterial("cloutMat", scene);
    cloudMaterial.emissiveTexture = cloudPT;
    cloudMaterial.emissiveTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    cloudMaterial.backFaceCulling = false;
    return skybox;
  }
  
  /**
   * Creates a basic grass ground
   * @param scene
   * @return ground mesh
   */
  static CreateGrassGround(scene) {
    // Ground
    //let groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    //groundMaterial.diffuseTexture = new BABYLON.Texture("assets/texture/ground.jpg", scene);
    let grassMaterial = new BABYLON.StandardMaterial("bawl", scene);
    let grassTexture = new BABYLON.GrassProceduralTexture("textbawl", 256, scene);
    grassMaterial.ambientTexture = grassTexture;
    let ground = BABYLON.Mesh.CreateGround("ground", 512, 512, 32, scene, false);
    ground.position.y = -1;
    ground.material = grassMaterial;
    return ground;
  }
  
  /**
    * Create random color cube
    * @param BABYLON.Vector3 pos
    * @param size
    * @param scene
    * @return box mesh
    */
  static CreateRandColorCube(pos, size, scene)
  {
    // hsl表色系で色をランダムに作成
      const h = Math.random() * 360; // 色相
      const s = 100; // 彩度
      const l = 60; // 明度
      const rgb = hsl2rgb(h, s, l);
      const color = new BABYLON.Color4.FromInts(rgb.r,rgb.g,rgb.b, 255);
      
      let options = {
      size: size,
      //faceColors : faceColors
    };
    
    let box = BABYLON.MeshBuilder.CreateBox("box", options, scene);
    box.material = new BABYLON.StandardMaterial("mat", scene);
    
    box.material.diffuseColor = color;
    box.material.emmisiveColor = color;
    
    box.position = pos;
  
    return box;
  }
  
  /**
   * Creates a BABYLONJS GUI with a single Button
   * @param btnText: string
   * @param btnClicked: (button: GUI.Button) => void
   */
  static createGui(btnText, btnClicked)
  {

    let guiTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    let btnTest = BABYLON.GUI.Button.CreateSimpleButton("but1", btnText);
    btnTest.width = "150px";
    btnTest.height = "40px";
    btnTest.color = "white";
    btnTest.background = "grey";
    btnTest.onPointerUpObservable.add(() => {
        if (btnClicked) {
            btnClicked(btnTest);
        }
    });
    btnTest.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    btnTest.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    btnTest.left = 12;
    btnTest.top = 12;
    //guiTexture.addControl(btnTest);
    
    return guiTexture;
  }
}


