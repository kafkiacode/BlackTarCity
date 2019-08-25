import React, { useEffect } from 'react';
import { useRender } from 'react-three-fiber';
import { DoubleSide } from 'three';
import * as THREE from 'three';
import Pillars from '../design/buildings/Pillars';
import DebugCamera from '../assistants/DebugCamera';
import Driver from '../actors/Driver';
import Loop from '../direction/Loop';
import DriverCamera from '../photography/cameras/DriverCamera';
import Track from '../design/Track';
import Lights from '../photography/Lights';
import SceneSettings from './SceneSettings';
import Effects from '../art/Effects';
import useStats from '../utils/useStats';
import MesoHighRise, {
  defaultMapFn as defaultMesoHighRiseMapFn,
} from '../design/buildings/MesoHighRise';
import Tunnels from '../design/Tunnels';
import stringColor from '../utils/stringColor';
export function SceneWrapper({ settings, children }) {
  window.THREE = THREE;
  const stats = useStats();
  const { isBloomOn, bgColor } = settings;

  useRender(({ gl, scene, camera }) => {
    if (!isBloomOn) {
      stats.begin();
      gl.render(scene, camera);
      stats.end();
    }
  }, !isBloomOn);

  useEffect(() => {
    document.body.style.backgroundColor = stringColor(bgColor);
  }, [bgColor]);

  return (
    <SceneSettings.Provider value={settings}>{children}</SceneSettings.Provider>
  );
}

function City({ settings }) {
  // const stats = useStats();
  const {
    mesoHighRisesCount = 1,
    isBloomOn,
    tunnels,
    cityRadius,
    palette,
  } = settings;
  console.log(JSON.parse(JSON.stringify(settings)));
  return (
    <SceneWrapper settings={settings}>
      <Loop>
        <DebugCamera />
        <Pillars />
        <Driver>
          <DriverCamera />
        </Driver>
        {Array(mesoHighRisesCount)
          .fill()
          .map(
            defaultMesoHighRiseMapFn({
              cityRadius,
              palette,
              tunnelRadius: tunnels.radius,
            }),
          )
          .map((props) => (
            <MesoHighRise {...props} />
          ))}
        <Track />
        <mesh name="groundPlane" rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[10000, 10000]} attach="geometry" />
          <meshBasicMaterial
            color={0x000008}
            attach="material"
            side={DoubleSide}
          />
        </mesh>
        <Lights />
        {isBloomOn && <Effects />}
        <ambientLight color="#59314f" intensity={0.4} />
        <Tunnels />
      </Loop>
    </SceneWrapper>
  );
}

export default City;
