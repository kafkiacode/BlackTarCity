# Black Tar City

A procedural city created using ReactJS and ThreeJs.
Version: 0.1
As shown in [Creative Coding Sydney Meetup of Aug 20 2019](https://www.meetup.com/Creative-Coding-Sydney/events/cdmdfryzlbbc/) and [JS Syd Meetup of Aug 21 2019](https://www.meetup.com/SydJS-S/events/sdfncryzlbcc/).

**WORK IN PROGRESS**

See it live at https://gabrielmerida.cl/demos/BlackTarCity/0.1/

Run it like this:
```
yarn install
yarn start
```

Or see the Storybook with
```
yarn storybook
```



## Technical roadmap
- Fix broken helper `useGui`
- Memoise maps of random objects (see comment)
- More debug cameras

## Notes
### Maps of components
In the component `<City>` we create a certain number of buildings by doing:
```jsx
return (
  <>
    <someComponent />
    {Array(mesoHighRisesCount)
      .fill()
      .map(mapRandomProps)
      .map(props => <MesoHighRise {...props}/>)}
  </>
);
```

This is fine, but the next time the `<City />` component is re-rendered (for instance, by changing its settings or any of it props), the array will be generated again. The right way to do this in React would be to a) memoize the result array or b) use a memoized component to hold the state of the array, something that can be used like
```jsx
<Collection Component={MesoHighRise} count={mesoHighRisesCount} mapFn={mapRandomProps} />
```
Depending on the results, we might need to define previously `const mapRandomProps = useCallback(mapRandomProps, [])` or leave this to the `Collection` component. More on this in version 0.2.

### Note about react-spring and rendering
The component [Loop](src/direction/Loop.js) uses the return value of `useSpring` (which will simply loop infinitely between 0 and 360 degrees) and passes it to the value of a context created by `React.createContext`. This is later used by the [Driver](src/actors/Driver.js) component to update its position on every frame.

The great thing is that, although the new position in the loop is calculated by `react-spring` on every frame, the `Driver` component **is not** re-rendered on every value change. The return value of `useSpring` is a mutable object, and its reference doesn't change on every frame, but its internal properties do. In that way, the context consumers don't need to re-render. But in `Driver`, instead of using the primitive `group` (or what in HTML context would be a `div`) we use `animated.group` (in HTML context, `animated.div` or `animated.span`). `animated` is a helper exported by `react-spring` which is able to read the value returned by `useSpring` and animate internally, _without re-rendering React_, the passed component. You can find more info about this in http://react-spring.io/.

## Available Scripts

```
yarn start
yarn storybook
```

## Credits for assets:

- [Blade Runner Car](https://sketchfab.com/3d-models/blade-runner-car-4c0c001c6bb54dd8bdb75d52664a2a0d)
