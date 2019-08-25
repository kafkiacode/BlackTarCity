import { mergeDeepRight } from 'ramda';
import { pick as randomPick } from 'canvas-sketch-util/random';
import { niceColorPalettes, cyberpunkColorsNoBlack } from '../art/palettes';

export const defaultCitySettings = {
  palette: [randomPick(niceColorPalettes)], // TODO: fix gui so an array is an array
  bgColor: 0xffffff,
  cityRadius: 10,
  lights: {
    directionalLightsCount: 4,
  },
  loop: { duration: 250000, start: true },
  isBloomOn: false,
  mesoHighRisesCount: 40,
  track: { simpleLinesCount: 10 },
  tunnels: {
    count: 0,
    radius: 2.5,
    lightTracksCount: 0,
  },
  car: 'SimpleCar',
  useTexture: false,
};

const mergeCityWith = mergeDeepRight(defaultCitySettings);

export const basicCitySettings = mergeCityWith({});

export const driveCitySettings = mergeCityWith({
  bgColor: 0,
  // isBloomOn: true,
  cityRadius: 500,
  palette: [cyberpunkColorsNoBlack],
  mesoHighRisesCount: 400,
  track: { simpleLinesCount: 250 },
  loop: { duration: 60000, start: true },
  tunnels: {
    count: 4,
    lightTracksCount: 5,
  },
  car: 'BladeRunnerCar',
  useTexture: true,
});
