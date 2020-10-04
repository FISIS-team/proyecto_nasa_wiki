import * as React from 'react';
import ThreePointVis from './ThreePointVis/ThreePointVis';
import './styles.css';

const data = new Array(1056).fill(0).map((d, id) => ({ id }));

export default function App() {
  const [layout, setLayout] = React.useState('grid');

  return (
    <div className="App">
      <div className="vis-container">
        <ThreePointVis data={data} layout={layout} />
      </div>
      <div className="controls">
        <strong>Layouts</strong>{' '}
        <button
          onClick={() => setLayout('grid')}
          className={layout === 'grid' ? 'active' : undefined}
        >
          Grid
        </button>
        <button
          onClick={() => setLayout('spiral')}
          className={layout === 'spiral' ? 'active' : undefined}
        >
          Spiral
        </button>
      </div>
    </div>
  );
}
