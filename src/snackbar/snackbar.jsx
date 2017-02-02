import React from 'react';

import '@material/snackbar/dist/mdc.snackbar.css';

export default class Snackbar extends React.PureComponent {
  render() {
    return (
      <div
        className="mdc-snackbar"
        aria-live="assertive"
        aria-atomic="true"
        aria-hidden="true"
      >
        <div className="mdc-snackbar__text">This is my snackbar</div>
        <div className="mdc-snackbar__action-wrapper">
          <button type="button" className="mdc-button mdc-snackbar__action-button">DO IT!</button>
        </div>
      </div>
    );
  }
}
