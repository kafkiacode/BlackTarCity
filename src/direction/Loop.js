import React, { createContext, useContext, memo } from 'react';
import { useSpring } from 'react-spring/three';
import SceneSettings from '../scenes/SceneSettings';

export const LoopContext = createContext();

export default memo(function Loop({ children }) {
  const {
    loop: { duration, start },
  } = useContext(SceneSettings);
  const spring = useSpring({
    to: async (next) => {
      if (!start) {
        return;
      }
      await next({ angle: Math.PI * 2 });
      while (true) {
        await next({ angle: Math.PI * 2, reset: true });
      }
    },
    from: { angle: 0 },
    config: { duration },
  });

  return (
    <LoopContext.Provider value={spring.angle}>{children}</LoopContext.Provider>
  );
});
