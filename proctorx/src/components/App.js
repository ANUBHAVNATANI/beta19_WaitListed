import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Voice from './Voice';
import Camera from './Camera';
import InitialView from './ExamView./InitialView';

const useStyles = makeStyles((theme) => ({
  fullview: {
    height: '100vh'
  }
}));

const App = () => {
  const classes = useStyles();
  const [violations, setViolations] = useState([]);
  const [testView, setTestView] = useState(false);

  useEffect(() => {
    // Prevent Ctrl+S, Ctrl+C & Ctrl+V
    document.onkeydown = function (e) {
      e = e || window.event; //Get event
      if (e.ctrlKey) {
        var c = e.code; //Get key code
        if (['KeyS', 'KeyC', 'KeyV'].includes(c)) {
          e.preventDefault();
          e.stopPropagation();
          setViolations([
            ...violations,
            'Violation : Ctrl + S, Ctrl+C, Ctrl+V not allowed'
          ]);
        }
      }
    };

    // detect tab switching
    document.addEventListener('visibilitychange', (event) => {
      if (document.visibilityState !== 'visible') {
        setViolations([...violations, 'Violation : Tab switching not allowed']);
      }
    });
  });

  return (
    <Fragment>
      {!testView ? (
        <InitialView testViewState={setTestView} />
      ) : (
        <Grid container>
          <Grid item xs={6}>
            <Paper className={classes.fullview}>
              <Camera />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.fullview}>
              <Voice />
              {/* TODO : there would be logging section here */}
              <ul>
                {violations.map((violation, index) => (
                  <li key={index}>{violation}</li>
                ))}
              </ul>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};

export default App;
