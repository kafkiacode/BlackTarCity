import React, { useState, useEffect, memo } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default memo(function BladeRunnerCar() {
  const [mesh, setMesh] = useState();
  useEffect(() => {
    new GLTFLoader().load(
      './models/blade_runner_car/scene.gltf',
      (gltf) => {
        gltf.scene.children[0].scale.set(0.5, 0.5, 0.5);
        setMesh(gltf.scene.children[0]);
      },
      console.log,
      console.error,
    );
  }, []);
  return mesh ? (
    <primitive
      object={mesh}
      position={[0, 0, 0]}
      rotation={[Math.PI / -2 - 0.2, 0, 0]}
    />
  ) : null;
});
