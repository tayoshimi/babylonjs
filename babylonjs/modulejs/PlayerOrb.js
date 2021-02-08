  /**
   * BabylonjsによるPlayer Orb
   * @example import PlayerOrb from '../modulejs/PlayerOrb.js';
   * @note insert <script type="module"> ... </script>
  */
  
  //import * as BABYLON from 'babylonjs';
   import ExplosionParticleEffect from '../modulejs/ExplosionParticleEffect.js';
  
  /**
   * タッチで操作可能なOrbクラス
  */
  export default class PlayerOrb {
    constructor(scene) {
      this._scene = scene;
      this._orb = null;
      
    }
    
    Create(scene){
    //光の球
    var orb = BABYLON.MeshBuilder.CreateSphere("sphere1",{diameter:2},scene);
    orb.position = new BABYLON.Vector3(0,4,0);
    var orbMat = new BABYLON.StandardMaterial("sphere", scene);
    orbMat.diffuseColor = new BABYLON.Color3(1,0,0);
    orbMat.emissiveColor = new BABYLON.Color3(1,0,0);
    orb.material = orbMat;
    
    orb.checkCollisions = true;
    orb.physicsImpostor = new BABYLON.PhysicsImpostor(orb, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 2, friction: 0.4, restitution: 0.3 }, scene);
    
    var gl = new BABYLON.GlowLayer("glow", scene,{
        //mainTextureFixedSize: 1024,
        blurKernelSize: 64
    });
    gl.intensity = 1;
    gl.customEmissiveColorSelector = function(mesh, subMesh, material, result) {
      if (mesh.name === "sphere1") {
          result.set(1, 0, 0, 1);
      } else {
          result.set(0, 0, 0, 0);
      }
    }
    
   // camera.parent = orb;
        
    var targetPos = orb.position;
    var delta = BABYLON.Vector3.Zero();
    var fps = 60;
    let move_speed = 0.5;
    let Epsilon = 0.1;
    var last_distance = Number.POSITIVE_INFINITY;
    
    let explosionEffect = new ExplosionParticleEffect(scene);
    //scene.debugLayer.show();

    scene.onPointerObservable.add((pointerInfo) => {
      switch (pointerInfo.type) {
        case BABYLON.PointerEventTypes.POINTERDOWN:
            //console.log("POINTER DOWN");
            break;
        case BABYLON.PointerEventTypes.POINTERUP:
            //console.log("POINTER UP");
            break;
        case BABYLON.PointerEventTypes.POINTERMOVE:
            //console.log("POINTER MOVE");
            break;
        case BABYLON.PointerEventTypes.POINTERPICK:
            //console.log("POINTER PICK" + pickInfo.pickedPoint);
            var pickInfo = pointerInfo.pickInfo;
            if (pickInfo.hit) {
              explosionEffect.SetEmitterPos(new BABYLON.Vector3(pickInfo.pickedPoint.x, pickInfo.pickedPoint.y+0.1, pickInfo.pickedPoint.z));
              
              explosionEffect.Reset();
              // Start the particle system
              explosionEffect.Start();
              
              targetPos = pickInfo.pickedPoint;
              targetPos.y = orb.position.y;
              delta = pickInfo.pickedPoint.subtract(orb.position).normalize().scale(scene.getAnimationRatio()*move_speed);
              delta.y = 0;

              orb.physicsImpostor.setLinearVelocity(BABYLON.Vector3.Zero());
              let contactLocalRefPoint = BABYLON.Vector3.Zero();
              //orb.physicsImpostor.applyForce(delta.scale(200), orb.getAbsolutePosition().add(contactLocalRefPoint));
              orb.physicsImpostor.applyImpulse(delta.scale(200), orb.getAbsolutePosition().add(contactLocalRefPoint));
   
              last_distance = Number.POSITIVE_INFINITY;  
            }
            break;
        case BABYLON.PointerEventTypes.POINTERTAP:
            //console.log("POINTER TAP");
            break;
        case BABYLON.PointerEventTypes.POINTERDOUBLETAP:
           // console.log("POINTER DOUBLE-TAP");
            break;
        default:
            break;
        }
    });
    
    scene.registerBeforeRender(() => {
    let distance = BABYLON.Vector3.Distance(targetPos, orb.position);
    if(distance < Epsilon || distance > last_distance ){
      orb.physicsImpostor.setLinearVelocity(BABYLON.Vector3.Zero());
    } else {
      last_distance = distance;
       }
            
    });
  }

}