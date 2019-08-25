import React, { useEffect, useState } from 'react';
import { GUI } from 'dat.gui';
import { map } from 'ramda';

let gui;

const folders = {};

export function useGui(
  { attr, addObject = {}, colorObject = {} },
  folderName = 'Controls',
) {
  if (!gui) {
    gui = new GUI(attr);
  }

  const [trackObj, setTrackObj] = useState(() => ({
    ...map((v) => (Array.isArray(v) ? v[0] : v), addObject),
    ...colorObject,
  }));

  useEffect(() => {
    if (!folders[folderName]) {
      folders[folderName] = gui.addFolder(folderName);
    }
    const folder = folders[folderName];

    Object.keys(addObject)
      .filter((k) =>
        ['number', 'string', 'boolean'].includes(typeof addObject[k]),
      )
      .forEach((key) => {
        folder
          .add(
            trackObj,
            key,
            ...(Array.isArray(addObject[key]) ? addObject[key].slice(1) : []),
          )
          .onChange((value) =>
            setTrackObj((prev) => ({ ...prev, [key]: value })),
          );
      });
    Object.keys(colorObject).forEach((key) => {
      gui
        .addColor(trackObj, key)
        .onChange((value) =>
          setTrackObj((prev) => ({ ...prev, [key]: value })),
        );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { gui, ...trackObj };
}

export function withGui({ settingsKey = 'settings' } = {}) {
  return function WithGuiHoc(Component) {
    function WithGuiComponent({ settings, ...props }) {
      const guiSettings = useGui(
        { addObject: settings },
        Component.name || Component.displayName,
      );
      const passedProps = {
        ...props,
        [settingsKey]: guiSettings,
      };
      return <Component {...passedProps} />;
    }
    WithGuiComponent.displayName = `withGui(${Component.name ||
      Component.displayName})`;
    return WithGuiComponent;
  };
}
