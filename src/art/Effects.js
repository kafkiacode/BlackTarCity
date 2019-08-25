import React, { useState, useRef, useEffect } from 'react';
import { apply, useRender, useThree } from 'react-three-fiber';
import { EffectComposer } from 'three/examples/jsm//postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm//postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm//postprocessing/UnrealBloomPass';
import { Vector2, ReinhardToneMapping } from 'three';
import useStats from '../utils/useStats';

apply({ EffectComposer, RenderPass, UnrealBloomPass });

function Effects() {
  const composer = useRef();

  const {
    gl,
    scene,
    camera,
    size: { width, height },
  } = useThree();

  useEffect(() => {
    gl.toneMapping = ReinhardToneMapping;
    gl.setClearColor('#000', 1);
    gl.setPixelRatio(window.devicePixelRatio);
  }, [gl]);

  useEffect(() => {
    composer.current.setSize(width, height);
  }, [width, height]);

  const stats = useStats();

  useRender(() => {
    stats.begin();
    composer.current.render();
    stats.end();
  }, true);

  const [isBloomOn, toggleBloom] = useState();
  useEffect(() => {
    requestAnimationFrame(() => {
      toggleBloom(false);
      requestAnimationFrame(() => toggleBloom(true));
    });
  }, [camera]);
  return (
    <effectComposer ref={composer} args={[gl]}>
      {isBloomOn && (
        <unrealBloomPass
          attachArray="passes"
          args={[new Vector2(width, height)]}
          resolution={[width, height]}
          exposure={1}
          strengh={1.8}
          threshold={0}
          radius={0.1}
          renderToScreen
        />
      )}
      <renderPass attachArray="passes" args={[scene, camera]} />
    </effectComposer>
  );
}

// Effects.whyDidYouRender = true;

export default Effects;
