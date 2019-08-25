import React, { useContext, useCallback, useRef } from 'react';
import { DoubleSide, Vector3 } from 'three';
import { apply } from 'react-three-fiber';
import * as meshline from 'three.meshline';
import SceneSettings from '../scenes/SceneSettings';

apply(meshline);

function defaultMapFn({ cityRadius, radius, lightTracksCount }) {
  return function mapFn(_, idx, { length }) {
    return {
      radius,
      cityRadius,
      arcStart: idx * ((Math.PI * 2) / length),
      arcLn: Math.PI / 16 + Math.random() * (Math.PI / 16),
      lightTracksCount,
    };
  };
}

// [0, 0, calcRadius, calcRadius, arcStart, arcLn],
function TunnelLightLine({ arcStart, arcLn, radius, height }) {
  const material = useRef();
  return (
    <mesh position={[0, height, 0]} rotation={[Math.PI, 0, 0]}>
      <meshLine
        onUpdate={(self) => {
          self.parent.geometry = self.geometry;
        }}
      >
        <geometry onUpdate={(self) => self.parent.setGeometry(self)}>
          <ellipseCurve
            args={[0, 0, radius, radius, arcStart, arcStart + arcLn]}
            onUpdate={(curve) => {
              curve.parent.vertices = curve
                .getPoints(50)
                .map((v2) => new Vector3(v2.x, 0, v2.y));
            }}
          />
        </geometry>
      </meshLine>
      {/** MeshLineMaterial on the other hand is a regular material, so we can just attach it */}
      <meshLineMaterial
        attach="material"
        ref={material}
        lineWidth={0.05}
        color={0xffffff}
      />
    </mesh>
  );
}

function Tunnel({
  cityRadius,
  radius,
  arcStart,
  arcLn,
  lightTracksCount,
  ...tunnelProps
}) {
  const lightLineMapFn = useCallback(
    function lightLineMapFn(_, idx, { length }) {
      const angleInTunnel = (Math.PI / length) * idx + (Math.PI / length) * 0.5;
      return {
        arcStart,
        arcLn,
        height: radius * 0.8 * Math.sin(angleInTunnel),
        radius: cityRadius - radius * 0.9 * Math.cos(angleInTunnel),
      };
    },
    [arcLn, arcStart, cityRadius, radius],
  );

  return (
    <>
      <group>
        {Array(lightTracksCount)
          .fill()
          .map(lightLineMapFn)
          .map((props) => (
            <TunnelLightLine {...props} />
          ))}
        <group rotation={[Math.PI / -2, 0, 0]}>
          <mesh {...tunnelProps} rotation={[0, 0, arcStart]}>
            <torusBufferGeometry
              attach="geometry"
              args={[cityRadius, radius, 8, 6, arcLn]}
            />
            <meshBasicMaterial color={0} attach="material" side={DoubleSide} />
          </mesh>
        </group>
      </group>
    </>
  );
}

export default function Tunnels() {
  const {
    cityRadius,
    tunnels: { radius, count, lightTracksCount },
  } = useContext(SceneSettings);
  return (
    <>
      {Array(count)
        .fill()
        .map(defaultMapFn({ cityRadius, radius, lightTracksCount }))
        .map((props) => (
          <Tunnel {...props} />
        ))}
    </>
  );
}
