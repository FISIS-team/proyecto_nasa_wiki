import * as React from 'react';
import * as THREE from 'three';

// re-use for instance computations
const scratchObject3D = new THREE.Object3D();

const InstancedPoints = ({ data }) => {
  const meshRef = React.useRef();
  const numPoints = data.length;

  // update instance matrices only when needed
  React.useEffect(() => {
    const mesh = meshRef.current;

    // set the transform matrix for each instance
    for (let i = 0; i < numPoints; ++i) {
      const x = (i % 30) * 2.5;
      const y = Math.floor(i / 30) * 2.5;
      const z = 0;

      scratchObject3D.position.set(x, y, z);
      scratchObject3D.rotation.set(0.5 * Math.PI, 0, 0); // cylinders face z direction
      scratchObject3D.updateMatrix();
      mesh.setMatrixAt(i, scratchObject3D.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  }, [numPoints]);

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