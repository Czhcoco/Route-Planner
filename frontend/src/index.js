import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import MainBlock from "./components/MainBlock";
import "../src/index.css";
import GoogleFontLoader from 'react-google-font-loader';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const THEME = createMuiTheme({
  typography: {
    "fontFamily": 'Rajdhani, Noto Serif SC'
  },
  palette: {
    primary: {
      main: '#7AA3BA',
    },
    secondary: {
      main: '#BFB0AA',
    },
    error: {
      main: '#A60303',
    },
    muted: {
      main: '#F2EDEB'
    },
    success: {
      main: '#4F8C64'
    },
    info: {
      main: '#7AA3BA'
    }
  },
});

ReactDOM.render(
  <React.StrictMode>
    <GoogleFontLoader
      fonts={[
        {
          font: 'Rajdhani',
          weights: [500, '500i'],
        },
        {
          font: 'Noto Serif SC',
          weights: [500],
        },
      ]}
    />
    <ThemeProvider theme={THEME}>
      <div className="container h-100 d-flex justify-content-center"
        style={{
          fontFamily: 'Rajdhani, Noto Serif SC',
        }}>
        <MainBlock />
      </div>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
