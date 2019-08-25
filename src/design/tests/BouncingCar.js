import React from 'react';
import { useSpring, animated } from 'react-spring/three';
import useGui from '../utils/useGui';

const BouncingCar = ({ originX = -4 }) => {
  const { targetX } = useGui({
    addObject: { targetX: [10, -30, 230] },
  });

  const { position } = useSpring({
    from: { position: [originX, 5, 230] },
    to: async (next) => {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        await next({ position: [targetX, 5, 230] });
        await next({ position: [originX, 5, 230] });
      }
    },
  });

  return (
    <group>
      <animated.mesh position={position} scale={[20, 20, 20]}>
        <cubeGeometry attach="geometry" />
        <meshBasicMaterial attach="material" color="black" />
      </animated.mesh>
    </group>
  );
};

export default BouncingCar;
