import React, { useContext, memo } from 'react';
import { animated } from 'react-spring/three';
import { LoopContext } from '../direction/Loop';
import BladeRunnerCar from '../design/Cars/BladeRunnerCar';
import SimpleCar from '../design/Cars/SimpleCar';
import SceneSettings from '../scenes/SceneSettings';

const cars = { SimpleCar, BladeRunnerCar };

export default memo(function Driver({ children }) {
  const { cityRadius, car } = useContext(SceneSettings);
  const value = useContext(LoopContext);
  const CarComponent = cars[car] || SimpleCar;
  return (
    <animated.group
      position={value.interpolate((v) => [
        cityRadius * Math.cos(v),
        0,
        cityRadius * -Math.sin(v),
      ])}
      rotation={value.interpolate((v) => [0, v + Math.PI, 0])}
    >
      <CarComponent />
      {children}
    </animated.group>
  );
});
