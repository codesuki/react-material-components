import React from 'react';

import '@material/radio/dist/mdc.radio.css';

export default class Radio extends React.PureComponent {
  render() {
    return (
      <div>
        <div className="mdc-radio">
          <input className="mdc-radio__native-control" type="radio" id="radio-1" name="radios" checked />
          <div className="mdc-radio__background">
            <div className="mdc-radio__outer-circle" />
            <div className="mdc-radio__inner-circle" />
          </div>
        </div>
        <label id="radio-1-label" htmlFor="radio-1">Radio 1</label>

        <div className="mdc-radio">
          <input className="mdc-radio__native-control" type="radio" id="radio-2" name="radios" />
          <div className="mdc-radio__background">
            <div className="mdc-radio__outer-circle" />
            <div className="mdc-radio__inner-circle" />
          </div>
        </div>
        <label id="radio-2-label" htmlFor="radio-2">Radio 2</label>
      </div>
    );
  }
}
