import React, { useEffect, useState, useRef } from 'react';
import { useThree } from 'react-three-fiber';
import { useGui } from '../utils/gui';

const DebugCamera = ({
  initialOn = false,
  position = [0, 2000, 0],
  target = [0, 0, 0],
}) => {
  const { current: initialOnRef } = useRef(initialOn);
  const {
    setDefaultCamera,
    camera,
    size: { width, height },
  } = useThree();

  const [isCamOvertaken, setIsCamOvertaken] = useState(false);
  const { isOn } = useGui({ addObject: { isOn: initialOnRef } });

  const prevCam = useRef(camera);
  // const prevCam = useRef();
  const thisCam = useRef();

  useEffect(() => {
    // this effect will run:
    // on scenario 0 (no other camera), after the initial one, ONLY ONCE
    // (bc the changes to state and camera are bound together)
    // on scenario 1 (prev camera), after the initial one, ONCE?
    // (first for camera.other, then for camera.this and overtaken=true)
    if (camera === thisCam.current) {
      // it's set by us, ignore
      return;
    }
    if (!isCamOvertaken) {
      // if the cam is not overtaken, ignore?
      prevCam.current = camera;
    }
  }, [camera, isCamOvertaken]);

  useEffect(() => {
    if (isOn && !isCamOvertaken) {
      setDefaultCamera(thisCam.current);
      setIsCamOvertaken(true);
    }
    if (!isOn && isCamOvertaken) {
      setDefaultCamera(prevCam.current);
      setIsCamOvertaken(false);
    }
    return () => {
      if (isCamOvertaken) {
        setDefaultCamera(prevCam.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOn, isCamOvertaken]);

  useEffect(() => {
    thisCam.current.rotation.set(Math.PI / 2, Math.PI, 0);
  }, [target]);

  return (
    <perspectiveCamera
      name="debugCamera"
      ref={thisCam}
      aspect={width / height}
      position={position}
      onUpdate={(self) => self.updateProjectionMatrix()}
      near={1}
      far={10100}
    />
  );
};

export default DebugCamera;
