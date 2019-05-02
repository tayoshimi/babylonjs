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
}


