import * as React from 'react';
import { Canvas } from 'react-three-fiber';
import Controls from './controls';
import InstancedPoints from './instancedPoints';

const ThreePointVis = ({ data, layout }) => {
  return (
    <Canvas camera={{ position: [0, 0, 80], far: 15000 }}>
      <Controls />
      <ambientLight color="#ffffff" intensity={0.1} />
      <hemisphereLight
        color="#ffffff"
        skyColor="#ffffbb"
        groundColor="#080820"
        intensity={1.0}
      />
      <InstancedPoints data={data} layout={layout} />
    </Canvas>
  );
};

export default ThreePointVis;
