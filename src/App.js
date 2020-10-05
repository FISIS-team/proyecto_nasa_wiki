import * as React from 'react';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import ThreePointVis from './ThreePointVis/ThreePointVis';
import PersistentDrawerLef from './sidebar'
import './styles.css';
import agileupvar from './jsonsPrueba/agileupvar.json'
import { requirePropFactory } from '@material-ui/core';

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
            <img src={process.env.PUBLIC_URL + '/agileupvar_IMG_O/' + selectedPoint.IMG_O}  style={{ width:'80%', margin: 'auto', display: 'block',maxWidth: '100%',maxHeight: '100%', paddingTop:'20%', paddingBottom:'11%'}}/>
          </div>
        )}
      </div>
      </ThemeProvider>
    </div>
  );
}
