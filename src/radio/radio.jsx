import React from 'react';

import { Set as ImmutableSet, Map as ImmutableMap } from 'immutable';
import classnames from 'classnames';
import { MDCRipple, MDCRippleFoundation } from '@material/ripple';
import { MDCRadioFoundation } from '@material/radio';
import '@material/radio/dist/mdc.radio.css';

export default class Radio extends React.PureComponent {
  static propTypes = {
    controlId: React.PropTypes.string,
    name: React.PropTypes.string,
    value: React.PropTypes.string,
    label: React.PropTypes.string,
    checked: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    onChange: React.PropTypes.func,
  }

  static defaultProps = {
    checked: false,
    disabled: false,
    onChange: () => {},
  }

  state = {
    classes: new ImmutableSet(),
    rippleCss: new ImmutableMap(),
    checked: this.props.checked,
    disabled: this.props.disabled,
  }

  componentDidMount() {
    this.foundation.init();
    this.foundation.setChecked(this.props.checked);
    this.rippleFoundation.init();
  }

  componentWillReceiveProps(props) {
    console.log(props);
  }

  componentDidUpdate() {
    this.state.rippleCss.forEach((v, k) => {
      this.refs.root.style.setProperty(k, v);
    });
  }

  componentWillUnmount() {
    this.rippleFoundation.destroy();
    this.foundation.destroy();
  }

  render() {
    return (
      <div>
        <div
          ref="root"
          className={classnames('mdc-radio', this.state.classes.toJS(), {
            'mdc-radio--disabled': this.state.disabled,
          })}
        >
          <input
            ref="radio"
            className="mdc-radio__native-control"
            type="radio"
            id={this.props.controlId}
            name={this.props.name}
            onChange={(evt) => {
              this.setState({
                checked: this.refs.radio.checked,
              });
              this.props.onChange(evt);
            }}
            disabled={this.state.disabled}
          />
          <div className="mdc-radio__background">
            <div className="mdc-radio__outer-circle" />
            <div className="mdc-radio__inner-circle" />
          </div>
        </div>
        <label
          id={this.props.controlId ? `${this.props.controlId}-label` : undefined}
          htmlFor={this.props.name}
        >{this.props.label}</label>
      </div>
    );
  }

  foundation = new MDCRadioFoundation({
    addClass: (className) => {
      this.setState(prevState => ({
        classes: prevState.classes.add(className),
      }));
    },
    removeClass: (className) => {
      this.setState(prevState => ({
        classes: prevState.classes.remove(className),
      }));
    },
    getNativeControl: () => this.refs.radio,
  });

  rippleFoundation = new MDCRippleFoundation(Object.assign(MDCRipple.createAdapter(this), {
    isUnbounded: () => true,
    // see https://github.com/material-components/material-components-web/blob/master/packages/mdc-radio/index.js
    // for why this is false
    isSurfaceActive: () => false,
    addClass: (className) => {
      this.setState(prevState => ({
        classes: prevState.classes.add(className),
      }));
    },
    removeClass: (className) => {
      this.setState(prevState => ({
        classes: prevState.classes.remove(className),
      }));
    },
    registerInteractionHandler: (type, handler) => this.refs.radio.addEventListener(type, handler),
    deregisterInteractionHandler: (type, handler) => this.refs.radio.removeEventListener(type, handler),
    updateCssVariable: (varName, value) => {
      this.setState(prevState => ({
        rippleCss: prevState.rippleCss.set(varName, value),
      }));
    },
    computeBoundingRect: () => {
      const { left, top } = this.refs.root.getBoundingClientRect();
      const DIM = 40;
      return {
        top,
        left,
        right: left + DIM,
        bottom: top + DIM,
        width: DIM,
        height: DIM,
      };
    },
  }));
}
