import React, { memo, useContext } from 'react';
import { DoubleSide } from 'three';
import SimpleLineAlongTrack, {
  defaultMapFn as simpleLinesMapFn,
} from './SimpleLineAlongTrack';
import SceneSettings from '../scenes/SceneSettings';

export default memo(function TrainTrack() {
  const {
    cityRadius = 500,
    track: { simpleLinesCount = 10 },
  } = useContext(SceneSettings);
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.2, 0]}>
        <ringBufferGeometry
          args={[cityRadius - 0.2, cityRadius + 0.2, 180, 1]}
          attach="geometry"
        />
        <meshBasicMaterial
          color={0xffffff}
          attach="material"
          side={DoubleSide}
          wireframe
        />
      </mesh>
      {Array(simpleLinesCount)
        .fill()
        .map(simpleLinesMapFn({ cityRadius }))
        .map((props) => (
          <SimpleLineAlongTrack {...props} />
        ))}
    </group>
  );
});
