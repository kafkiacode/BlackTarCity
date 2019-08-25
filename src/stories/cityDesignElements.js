import React from 'react';
import { storiesOf } from '@storybook/react';
import { Pillar } from '../design/buildings/Pillars';
import MesoHighRise from '../design/buildings/MesoHighRise';
import BladeRunnerCar from '../design/Cars/BladeRunnerCar';
import SimpleCar from '../design/Cars/SimpleCar';
import { liftCamera, addPointLights, addOrbitControls } from './decorators';

export default function() {
  storiesOf('City|Buildings/Pillar', module)
    .addDecorator(addPointLights())
    .addDecorator(liftCamera())
    .addDecorator(addOrbitControls())
    .add('default', () => <Pillar width={1} height={2} />);

  storiesOf('City|Buildings/MesoHighRise', module)
    .addDecorator(addPointLights())
    .addDecorator(liftCamera())
    .addDecorator(addOrbitControls())
    .add('default', () => (
      <>
        <directionalLight />
        <MesoHighRise color="blue" height={3} base={0.6} />
      </>
    ))
    .add('heightVariation = 0.5', () => (
      <>
        <pointLight position={[3, 3, 3]} />
        <MesoHighRise
          color="lime"
          height={3}
          base={0.6}
          heightVariation={0.5}
          steps={10}
        />
      </>
    ))
    .add('xzVariation = 0.5', () => (
      <>
        <pointLight position={[3, 3, 3]} />
        <MesoHighRise
          color="lime"
          height={3}
          base={3}
          steps={3}
          xzVariation={1.7}
        />
      </>
    ))
    .add('xzVariation = 0', () => (
      <>
        <pointLight position={[3, 3, 3]} />
        <MesoHighRise color="lime" height={3} base={1} steps={3} />
      </>
    ))
    .add('many variations', () => (
      <>
        <pointLight position={[3, 3, 3]} />
        {Array(5)
          .fill()
          .map((_, x) => (
            <>
              {Array(5)
                .fill()
                .map((__, z) => (
                  <MesoHighRise
                    color="lime"
                    height={3}
                    base={0.7}
                    steps={15}
                    heightVariation={0.8}
                    xzVariation={2.7}
                    position={[x, 0, z]}
                  />
                ))}
            </>
          ))}
      </>
    ));

  storiesOf('City|Vehicles/SimpleCar', module)
    .addDecorator(addPointLights())
    .addDecorator(liftCamera())
    .addDecorator(addOrbitControls())

    .add('default', () => <SimpleCar />);

  storiesOf('City|Vehicles/BladeRunnerCar', module)
    .addDecorator(addPointLights())
    .addDecorator(liftCamera())
    .addDecorator(addOrbitControls())
    .add('default', () => <BladeRunnerCar />);
}
