import React, { memo } from 'react';
import { box, sphere } from '../basics/geometries';

export default memo(function SimpleCar() {
  return (
    <>
      <mesh geometry={box} scale={[1, 1, 1]}>
        <meshBasicMaterial color="purple" attach="material" />
      </mesh>
      <mesh geometry={sphere} scale={[0.5, 0.5, 0.5]} position={[0, 0, 0.5]}>
        <meshBasicMaterial color="lightblue" attach="material" />
      </mesh>
    </>
  );
});
