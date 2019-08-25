/* eslint-disable no-await-in-loop */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-constant-condition
import React, { useEffect, useRef } from 'react';
import { useThree } from 'react-three-fiber';
import { useSpring, animated } from 'react-spring/three';
import { Vector3 } from 'three';

// A default perspective camera:
// fov: 75, near: 0.1, far: 1000, position.z: 5

const BouncingCamera = ({
  originalPosition = [0, 1.5, -250],
  targetPosition = [0, 1.5, 200],
}) => {
  console.log('BouncingCamera');
  const {
    size: { width, height },
    setDefaultCamera,
    camera,
  } = useThree();
  const thisCamera = useRef();
  const { position } = useSpring({
    from: { position: originalPosition },
    to: async (next) => {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        await next({ position: targetPosition });
        await next({ position: originalPosition });
      }
    },
  });

  const prevCamera = useRef(camera);
  useEffect(() => {
    console.log('BouncingCamera useEffect');
    prevCamera.current = camera;
    setDefaultCamera(thisCamera.current);
    return () => {
      setDefaultCamera(prevCamera.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    thisCamera.current.lookAt(
      thisCamera.current.position.clone().add(new Vector3(0, 0, 1)),
    );
  }, []);

  return (
    <animated.perspectiveCamera
      name="bouncingCamera"
      ref={thisCamera}
      aspect={width / height}
      position={position}
      onUpdate={(self) => self.updateProjectionMatrix()}
    />
  );
};

export default BouncingCamera;
