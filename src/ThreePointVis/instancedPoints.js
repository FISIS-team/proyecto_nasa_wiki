import * as React from 'react';
import * as THREE from 'three';
import { useLayout } from './layouts';

// re-use for instance computations
const scratchObject3D = new THREE.Object3D();

const InstancedPoints = ({ data, layout }) => {
  useLayout({ data, layout });
  const meshRef = React.useRef();
  const numPoints = data.length;

  // update instance matrices only when needed
  React.useEffect(() => {
    const mesh = meshRef.current;

    // set the transform matrix for each instance
    for (let i = 0; i < data.length; ++i) {
      const { x, y, z } = data[i];

      scratchObject3D.position.set(x, y, z);
      scratchObject3D.rotation.set(0.5 * Math.PI, 0, 0); // cylinders face z direction
      scratchObject3D.updateMatrix();
      mesh.setMatrixAt(i, scratchObject3D.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  }, [data, layout]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, numPoints]}
      frustumCulled={false}
    >
      <sphereBufferGeometry attach="geometry" args={[1, 35, 35]} />
      <meshStandardMaterial attach="material" color="#D1D2F9" />
    </instancedMesh>
  );
};

export default InstancedPoints;