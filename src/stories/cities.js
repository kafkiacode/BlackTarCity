/* eslint-disable no-unused-vars */
import React from 'react';
import { compose } from 'ramda';
import { storiesOf } from '@storybook/react';
import { DoubleSide } from 'three';
import City, { SceneWrapper } from '../scenes/City';
import { basicCitySettings, driveCitySettings } from '../scenes/citySettings';
import { withGui } from '../utils/gui';
import Loop from '../direction/Loop';
import Tunnels from '../design/Tunnels';
import Driver from '../actors/Driver';
import DriverCamera from '../photography/cameras/DriverCamera';
import { niceColorPalettes } from '../art/palettes';
import Lights from '../photography/Lights';
import DebugCamera from '../assistants/DebugCamera';
import Track from '../design/Track';
import MesoHighRise, {
  defaultMapFn as defaultMesoHighRiseMapFn,
} from '../design/buildings/MesoHighRise';

const CityWithGui = withGui()(City);

function addRandomRotation(item) {
  return {
    ...item,
    rotation: [Math.random() * Math.PI, 0, Math.random() * Math.PI],
  };
}

export default function() {
  storiesOf('Scene|Cities/Basic', module).add('default', () => (
    <CityWithGui settings={basicCitySettings} />
  ));

  storiesOf('Scene|Cities/Custom', module).add('default', () => {
    const settings = {
      palette: niceColorPalettes[7],
      bgColor: 0xffffff,
      cityRadius: 25,
      lights: {
        directionalLightsCount: 4,
      },
      loop: { duration: 600000, start: true },
      isBloomOn: false,
      mesoHighRisesCount: 120,
      track: { simpleLinesCount: 10 },
      tunnels: {
        count: 0,
        radius: 1.5,
        lightTracksCount: 0,
      },
      car: 'SimpleCar',
    };
    return (
      <SceneWrapper settings={settings}>
        <Loop>
          <DebugCamera />
          <Tunnels />
          <Driver>
            <DriverCamera />
          </Driver>
          <Lights />
          <Track />
          {Array(settings.mesoHighRisesCount)
            .fill()
            .map(
              compose(
                // addRandomRotation,
                defaultMesoHighRiseMapFn({
                  cityRadius: settings.cityRadius,
                  palette: settings.palette,
                  tunnelRadius: settings.tunnels.radius,
                }),
              ),
            )
            .map((props) => (
              <MesoHighRise {...props} />
            ))}
          <mesh name="groundPlane" rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[10000, 10000]} attach="geometry" />
            <meshBasicMaterial
              color={0x000008}
              attach="material"
              side={DoubleSide}
            />
          </mesh>
          <ambientLight color="#59314f" intensity={0.4} />
        </Loop>
      </SceneWrapper>
    );
  });

  storiesOf('Scene|Cities/Drive', module).add('default', () => (
    <CityWithGui settings={driveCitySettings} />
  ));
}
