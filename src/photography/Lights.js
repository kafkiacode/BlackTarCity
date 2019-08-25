import React, { memo, useContext } from 'react';
import { Vector3 } from 'three';
import SceneSettings from '../scenes/SceneSettings';

function mapDirectionalLights({ cityRadius }) {
  return function mapFn(_, idx, { length }) {
    const arcPos = ((Math.PI * 2) / length) * idx;
    return {
      intensity: 0.2,
      position: new Vector3().setFromCylindricalCoords(
        cityRadius + 100,
        arcPos,
        20,
      ),
      color: ['blue', 'red'][idx % length],
    };
  };
}

export default memo(function Lights() {
  const {
    cityRadius,
    lights: { directionalLightsCount },
  } = useContext(SceneSettings);
  return (
    <group>
      {Array(directionalLightsCount)
        .fill()
        .map(mapDirectionalLights({ cityRadius }))
        .map((props, key) => (
          <directionalLight {...props} key={key} />
        ))}
      <pointLight distance={0} decay={1} />
    </group>
  );
});
