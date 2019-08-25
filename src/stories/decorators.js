import React, { useEffect, useRef } from 'react';
import { useThree, extend, useRender } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useGui } from '../utils/gui';

extend({ OrbitControls });

export const addPointLights = () => (storyFn) => (
  <>
    <pointLight position={[13, 13, 13]} />
    <pointLight position={[-13, 13, -13]} />
    {storyFn()}
  </>
);

// function LiftCamera() {
//   const { camera } = useThree();
//   useEffect(() => {
//     camera.position.y = 2;
//     camera.lookAt(0, 0, 0);
//   }, [camera]);
//   return null;
// }

export const liftCamera = () => (storyFn) => {
  return (
    <>
      {/* <LiftCamera /> */}
      {storyFn()}
    </>
  );
};

function Wrapper({ children }) {
  const { camera, gl } = useThree();
  const { autoRotate } = useGui(
    { addObject: { autoRotate: true } },
    'Storybook',
  );
  const orbit = useRef();
  useRender(() => orbit.current.update());
  return (
    <>
      <ambientLight intensity={0.1} />
      <orbitControls
        ref={orbit}
        args={[camera, gl.domElement]}
        enableDamping
        dampingFactor={0.1}
        autoRotate={autoRotate}
      />
      {children}
    </>
  );
}
export const addOrbitControls = () => (storyFn) => (
  <Wrapper>{storyFn()}</Wrapper>
);
