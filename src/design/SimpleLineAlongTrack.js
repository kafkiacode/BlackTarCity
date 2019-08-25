import React, { memo } from 'react';
import { Vector3 } from 'three';

export default memo(function SimpleLineAlongTrack({
  position,
  color,
  curveArgs,
}) {
  return (
    <line position={position}>
      <geometry
        attach="geometry"
        onUpdate={(self) => {
          self.parent.geometry = self;
        }}
      >
        <ellipseCurve
          args={curveArgs}
          onUpdate={(curve) => {
            curve.parent.vertices = curve
              .getPoints(50)
              .map((v2) => new Vector3(v2.x, 0, v2.y));
          }}
        />
      </geometry>
      <lineBasicMaterial attach="material" color={color} />
    </line>
  );
});

const distanceFromRadius = 5;
const colors = ['red', 'blue', 'lightblue'];

export function defaultMapFn({ cityRadius }) {
  return function mapFn(_, idx) {
    const calcRadius =
      cityRadius + Math.random() * distanceFromRadius - distanceFromRadius / 2;
    const arcStart = Math.random() * Math.PI * 2;
    const arcLn = arcStart + Math.PI / 32 + Math.random() * (Math.PI / 64);
    return {
      position: [0, 0.2 + Math.random() * 1.5, 0],
      color: colors[idx % colors.length],
      curveArgs: [0, 0, calcRadius, calcRadius, arcStart, arcLn],
    };
  };
}
