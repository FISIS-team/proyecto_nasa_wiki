import * as React from 'react';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import ThreePointVis from './ThreePointVis/ThreePointVis';
import PersistentDrawerLef from './sidebar'
import './styles.css';
import agileupvar from './jsonsPrueba/agileupvar.json'

const data = new Array(1056).fill(0).map((d, id) => ({ id }));

export default function App() {
  const [layout, setLayout] = React.useState('grid');
  const [selectedPoint, setSelectedPoint] = React.useState(null);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#101030",
      },
      secondary: {
        main: "#ffffff",
      },
      warning: {
        main: "#5B3367",
      },
      success: {
        main: "#FAC8C8",
      },
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <PersistentDrawerLef/>
      <div className="vis-container">
        <ThreePointVis
          data={agileupvar}
          layout={layout}
          selectedPoint={selectedPoint}
          onSelectPoint={setSelectedPoint}
        />
      </div>
      <div className="controls">
        <p>
        Hello, to control this wiki you only have to use the mouse, with a left click you drag the screen, with a right click the 3d image is rotated and zoom with wheel of the mouse
         :D. Each sphere represents an image of the mission selected
        </p>
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
        {selectedPoint && (
          <div className="selected-point">
            Name: <strong>{selectedPoint.name}</strong> <br/>
            galactic_longitude: <strong>{selectedPoint.galactic_longitude}</strong> <br/>
            galactic_latitude: <strong>{selectedPoint.galactic_latitude}</strong> <br/>
            class: <strong>{selectedPoint.class}</strong> <br/>
            FITS_O: <strong>{selectedPoint.FITS_O}</strong> <br/>
          </div>
        )}
      </div>
      </ThemeProvider>
    </div>
  );
}
