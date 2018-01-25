import React from 'react';
import Component from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper'
import TyriaMap from './component/TyriaMap';

import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <TyriaMap/>
        <MuiThemeProvider>
          .
        </MuiThemeProvider>
      </div>
    );
  }
}
