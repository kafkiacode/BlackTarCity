import React from 'react';
import ReactDOM from 'react-dom';
import { Canvas } from 'react-three-fiber';
import City from './scenes/City';
import {
  // eslint-disable-next-line no-unused-vars
  driveCitySettings,
  // eslint-disable-next-line no-unused-vars
  defaultCitySettings,
  // eslint-disable-next-line no-unused-vars
  basicCitySettings,
} from './scenes/citySettings';
import { withGui } from './utils/gui';
import './index.css';

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React);
}

const CityWithGui = withGui()(City);

ReactDOM.render(
  <Canvas
    camera={{ name: 'CanvasCamera' }}
    onCreated={({ scene }) => {
      window.scene = scene;
    }}
  >
    {/* <CityWithGui settings={basicCitySettings} /> */}
    {/* <CityWithGui settings={defaultCitySettings} /> */}
    <CityWithGui settings={driveCitySettings} />
  </Canvas>,
  document.getElementById('root'),
);
