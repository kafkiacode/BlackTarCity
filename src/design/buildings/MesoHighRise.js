import React, { memo, useState } from 'react';
import { parse as colorParse, offsetHSL } from 'canvas-sketch-util/color';
import {
  value as randomValue,
  sign as randomSign,
} from 'canvas-sketch-util/random';
import { box } from '../basics/geometries';
import getRandomWeights from '../../utils/random/getRandomWeights';
import getRandomScale from '../../utils/random/getRandomScale';
import stringColor from '../../utils/stringColor';

const defaultMaterialAttrs = { color: 'blue' };

export function defaultMapFn({ cityRadius, tunnelRadius, palette }) {
  return function mapFn(_, idx, { length }) {
    const segmentAngle = ((Math.PI * 2) / length) * idx;
    let displacement = Math.random() * 50 - 25;
    displacement += (displacement > 0 ? 1 : -1) * (tunnelRadius + 2);
    return {
      hslVariation: 0.1,
      heightVariation: 1,
      xzVariation: 2,
      steps: 10,
      height: 5 + Math.random() * 10,
      base: 2,
      key: idx,
      color: palette[idx % palette.length],
      position: [
        (cityRadius + displacement) * Math.cos(segmentAngle),
        0,
        (cityRadius + displacement) * -Math.sin(segmentAngle),
      ],
    };
  };
}

export default memo(function MesoHighRise({
  height = 10,
  base = 2,
  steps = 3,
  heightVariation = 0,
  xzVariation = 0,
  hslVariation = 0,
  color,
  ...props
}) {
  const [heightVariations] = useState(getRandomWeights(steps, heightVariation));
  const [sxVariations] = useState(getRandomScale(steps, xzVariation));
  const [szVariations] = useState(getRandomScale(steps, xzVariation));
  const [pxVariations] = useState(getRandomScale(steps, xzVariation));
  const [pzVariations] = useState(getRandomScale(steps, xzVariation));

  return (
    <group name="MesoHighRise" {...props}>
      {Array(steps)
        .fill()
        .map((_, idx) => {
          const stepBaseX = (1 - (sxVariations[idx - 1] || 0)) * base;
          const stepBaseZ = (1 - (szVariations[idx - 1] || 0)) * base;
          const stepBasePosX =
            ((1 / steps) * idx - (pxVariations[idx - 1] || 0)) * base;
          const stepBasePosZ =
            ((1 / steps) * idx - (pzVariations[idx - 1] || 0)) * base;
          const stepHeight = heightVariations[idx] * height * (idx + 1);
          const newColor = offsetHSL(
            colorParse(stringColor(color)),
            randomValue() * randomSign() * hslVariation * 0.5 * 360,
            randomValue() * randomSign() * hslVariation * 100,
            randomValue() * randomSign() * hslVariation * 100,
          ).hex;

          return (
            <mesh
              key={idx}
              position={[stepBasePosX, stepHeight / 2, stepBasePosZ]}
              geometry={box}
              scale={[stepBaseX, stepHeight, stepBaseZ]}
            >
              <meshLambertMaterial
                attach="material"
                {...defaultMaterialAttrs}
                color={newColor}
              />
            </mesh>
          );
        })}
    </group>
  );
});
