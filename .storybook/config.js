import React, { Fragment, useRef } from 'react';
import { configure, addParameters, addDecorator } from '@storybook/react';
import { themes } from '@storybook/theming';
import { Canvas } from 'react-three-fiber';

addDecorator((storyFn) => (
  <Canvas camera={{ name: 'CanvasCamera' }}
  onCreated={({ scene }) => {
    window.scene = scene;
  }}>{storyFn()}</Canvas>
));

function loadStories() {
  require('../src/stories');
}

addParameters({
  options: {
    theme: themes.dark,
    showPanel: true,
    panelPosition: 'right',
  },
});

configure(loadStories, module);