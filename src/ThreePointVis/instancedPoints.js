import * as React from 'react';
import * as THREE from 'three';
import { useAnimatedLayout } from './layouts';

// re-use for instance computations
const scratchObject3D = new THREE.Object3D();

function updateInstancedMeshMatrices({ mesh, data }) {
  if (!mesh) return;

  // set the transform matrix for each instance
  for (let i = 0; i < data.length; ++i) {
    const { x, y, z } = data[i];

    scratchObject3D.position.set(x, y, z);
    scratchObject3D.rotation.set(0.5 * Math.PI, 0, 0); // cylinders face z direction
    scratchObject3D.updateMatrix();
    mesh.setMatrixAt(i, scratchObject3D.matrix);
  }

  mesh.instanceMatrix.needsUpdate = true;
}

const SELECTED_COLOR = '#00f2ff';
const DEFAULT_COLOR = '#D1D2F9';

// re-use for instance computations
const scratchColor = new THREE.Color();

const usePointColors = ({ data, selectedPoint }) => {
  const numPoints = data.length;
  const colorAttrib = React.useRef();
  const colorArray = React.useMemo(() => new Float32Array(numPoints * 3), [
    numPoints,
  ]);

  React.useEffect(() => {
    for (let i = 0; i < data.length; ++i) {
      scratchColor.set(
        data[i] === selectedPoint ? SELECTED_COLOR : DEFAULT_COLOR
      );
      scratchColor.toArray(colorArray, i * 3);
    }
    colorAttrib.current.needsUpdate = true;
  }, [data, selectedPoint, colorArray]);

  return { colorAttrib, colorArray };
};

const useMousePointInteraction = ({ data, selectedPoint, onSelectPoint }) => {
  // track mousedown position to skip click handlers on drags
  const mouseDownRef = React.useRef([0, 0]);
  const handlePointerDown = e => {
    mouseDownRef.current[0] = e.clientX;
    mouseDownRef.current[1] = e.clientY;
  };

  const handleClick = event => {
    const { instanceId, clientX, clientY } = event;
    const downDistance = Math.sqrt(
      Math.pow(mouseDownRef.current[0] - clientX, 2) +
        Math.pow(mouseDownRef.current[1] - clientY, 2)
    );

    // skip click if we dragged more than 5px distance
    if (downDistance > 5) {
      event.stopPropagation();
      return;
    }

    // index is instanceId if we never change sort order
    const index = instanceId;
    const point = data[index];

    console.log('got point =', point);
    // toggle the point
    if (point === selectedPoint) {
      onSelectPoint(null);
    } else {
      onSelectPoint(point);
    }
  };

  return { handlePointerDown, handleClick };
};

const InstancedPoints = ({ data, layout, selectedPoint, onSelectPoint }) => {
  const meshRef = React.useRef();
  const numPoints = data.length;

  // run the layout, animating on change
  useAnimatedLayout({
    data,
    layout,
    onFrame: () => {
      updateInstancedMeshMatrices({ mesh: meshRef.current, data });
    },
  });

  // update instance matrices only when needed
  React.useEffect(() => {
    updateInstancedMeshMatrices({ mesh: meshRef.current, data });
  }, [data, layout]);

  const { handleClick, handlePointerDown } = useMousePointInteraction({
    data,
    selectedPoint,
    onSelectPoint,
  });
  const { colorAttrib, colorArray } = usePointColors({ data, selectedPoint });

  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, numPoints]}
      frustumCulled={false}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
    >
      <sphereBufferGeometry attach="geometry" args={[1, 35, 35]}>
        <instancedBufferAttribute
          ref={colorAttrib}
          attachObject={['attributes', 'color']}
          args={[colorArray, 3]}
        />
      </sphereBufferGeometry>
      <meshStandardMaterial
        attach="material"
        vertexColors={THREE.VertexColors}
      />
    </instancedMesh>
  );
};

export default InstancedPoints;
