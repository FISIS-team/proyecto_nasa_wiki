import * as React from 'react';
import { Canvas } from 'react-three-fiber';
import Controls from './controls.js';
import InstancedPoints from './instancedPoints.js';

const ThreePointVis = ({data}) => {
  return (
    <Canvas camera={{ position: [0, 0, 40] }}>
      <Controls />
      <ambientLight color="#ffffff" intensity={0.1} />
      <hemisphereLight
        color="#ffffff"
        skyColor="#ffffbb"
        groundColor="#080820"
        intensity={1.0}
      />
     <InstancedPoints data={data}/>
    </Canvas>
  );
};

export default ThreePointVis;