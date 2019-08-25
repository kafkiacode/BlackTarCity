import React, { useEffect, useRef } from 'react';
import { useThree } from 'react-three-fiber';

export default function DriverCamera() {
  const {
    size: { width, height },
    setDefaultCamera,
    camera,
  } = useThree();

  const thisCamera = useRef();
  const prevCamera = useRef(camera);
  useEffect(() => {
    prevCamera.current = camera;
    setDefaultCamera(thisCamera.current);
    return () => {
      setDefaultCamera(prevCamera.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <group rotation={[0, Math.PI, 0]} position={[0, 1.6, -4]}>
      <perspectiveCamera
        near={0.001}
        name="DriverCamera"
        ref={thisCamera}
        aspect={width / height}
        onUpdate={(self) => self.updateProjectionMatrix()}
      />
    </group>
  );
}
