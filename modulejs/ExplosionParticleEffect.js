/**
 * BabylonjsによるParticle effect
 * @example import ExplosionParticleEffect from '../modulejs/ExplosionParticleEffect.js';
 * @note insert <script type="module"> ... </script>
 */

//import * as BABYLON from 'babylonjs';

/**
 * 爆発系のParticle effectクラス
 */
export default class ExplosionParticleEffect {
  constructor(scene) {
    this._scene = scene;
    this._particleSystem = this.CreateParticleSystem(this._scene);
  }
  
  CreateParticleSystem(scene) {
    // Create a particle system
    let particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);

    //Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture("../textures/flare.png", scene);

     // Where the particles come from
    particleSystem.emitter =  new BABYLON.Vector3(0.0, 0.0, 0.0); // the starting object, the emitter
    let emitterType = new BABYLON.SphereParticleEmitter();
    emitterType.radius = 1;
    emitterType.radiusRange = 0;

    particleSystem.particleEmitterType = emitterType;

    // Colors of all particles
    particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
    particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
    particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

    // Size of each particle (random between...
    particleSystem.minSize = 0.1;
    particleSystem.maxSize = 0.5;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 0.1;
    particleSystem.maxLifeTime = 1.0;

    // Emission rate
    particleSystem.emitRate = 1400;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);

    // Angular speed, in radians
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;

    // Speed
    particleSystem.minEmitPower = 10;
    particleSystem.maxEmitPower = 10;
    particleSystem.updateSpeed = 0.02;
    particleSystem.targetStopDuration = 2;

    particleSystem.addLifeTimeGradient(0, 0.8);
    particleSystem.addLifeTimeGradient(1, 0.1);

    //particleSystem.addEmitRateGradient(0, 5, 10);
    //particleSystem.addEmitRateGradient(0.5, 5, 10);
    //particleSystem.addEmitRateGradient(1.0, 800, 1000);

    // Limit velocity
    particleSystem.addLimitVelocityGradient(0, 1);
  particleSystem.addLimitVelocityGradient(0.120, 0.983); particleSystem.addLimitVelocityGradient(0.445, 0.780); particleSystem.addLimitVelocityGradient(0.691, 0.502); particleSystem.addLimitVelocityGradient(0.930, 0.05); particleSystem.addLimitVelocityGradient(1.0, 0);
    particleSystem.limitVelocityDamping = 0.6;
  
  
    particleSystem.addStartSizeGradient(0, 8);
    particleSystem.addStartSizeGradient(1, 1);
    
    return particleSystem;
  }
  
  SetEmitterPos(pos){
    this._particleSystem.emitter = pos;
    
    //new BABYLON.Vector3(pickInfo.pickedPoint.x, pickInfo.pickedPoint.y+0.1, pickInfo.pickedPoint.z);
  }
  
  Reset(){
    this._particleSystem.reset();
  }
  
  Start(){
    this._particleSystem.start();
  }
  
}


