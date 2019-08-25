import React, { useMemo, useContext } from 'react';
import { TextureLoader, RepeatWrapping } from 'three';
import { useSpring, animated } from 'react-spring';
import { box } from '../basics/geometries';
import SceneSettings from '../../scenes/SceneSettings';

// const textureUrl = './textures/payam-tavakoli-pt-hull-texture2.jpg';
// const textureUrl = './textures/modern-building-facade-texture-free.jpg';
// const textureUrl = './textures/modern-building-facade-texture-free2.jpg';
const textureUrl = './textures/TexturesCom_HighRiseNight0060_M_3.jpg';

export const Pillar = ({
  height = 1,
  width = 50,
  position = [0, height / 2, 0],
  color = 'lime',
  useTexture = false,
}) => {
  const texture = useMemo(
    () => useTexture && new TextureLoader().load(textureUrl),
    [useTexture],
  );
  console.log(texture);
  const { offset } = useSpring({
    from: { offset: [0, 0] },
    to: { offset: [-5, 10] },
    config: { mass: 100, friction: 1000 },
  });
  return (
    <mesh position={position} scale={[width, height, width]} geometry={box}>
      <meshBasicMaterial attach="material" color={color}>
        {useTexture && (
          <animated.primitive
            attach="map"
            object={texture}
            wrapS={RepeatWrapping}
            wrapT={RepeatWrapping}
            repeat={[2.5, 5]}
            offset={offset}
          />
        )}
      </meshBasicMaterial>
    </mesh>
  );
};

const Pillars = () => {
  const { palette, useTexture } = useContext(SceneSettings);
  return (
    <group>
      <Pillar
        useTexture={useTexture}
        position={[500, 300 / 2, 500]}
        height={300}
        color={palette[0]}
      />
      <Pillar
        useTexture={useTexture}
        position={[500, 250 / 2, -500]}
        height={250}
        color={palette[1]}
      />
      <Pillar
        useTexture={useTexture}
        position={[-500, 350 / 2, 500]}
        height={350}
        color={palette[2]}
      />
      <Pillar
        useTexture={useTexture}
        position={[-500, 150 / 2, -500]}
        height={150}
        color="lime"
      />
    </group>
  );
};

export default Pillars;
