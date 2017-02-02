import React from 'react';

import { Set as ImmutableSet, Map as ImmutableMap } from 'immutable';
import classnames from 'classnames';
import { getCorrectEventName } from '@material/animation';
import { MDCCheckboxFoundation } from '@material/checkbox';
import { MDCRipple, MDCRippleFoundation } from '@material/ripple';
import { getMatchesProperty } from '@material/ripple/util';
import '@material/checkbox/dist/mdc.checkbox.css';

const MATCHES = getMatchesProperty(HTMLElement.prototype);

export default class Checkbox extends React.PureComponent {
  static propTypes = {
    controlId: React.PropTypes.string,
    checked: React.PropTypes.bool,
    indeterminate: React.PropTypes.bool,
    onChange: React.PropTypes.func,
  }

  static defaultProps = {
    checked: false,
    indeterminate: false,
    onChange: () => {},
  }

  state = {
    classes: new ImmutableSet(),
    css: new ImmutableMap(),

    checked: this.props.checked,
    indeterminate: this.props.indeterminate,
  }

  componentDidMount() {
    this.foundation.init();
    this.rippleFoundation.init();
  }

  componentWillReceiveProps(props) {
    if (props.checked !== this.props.checked) {
      this.setState({ checked: props.checked, indeterminate: false });
    }
    if (props.indeterminate !== this.props.indeterminate) {
      this.setState({ indeterminate: props.indeterminate });
    }
  }

  componentDidUpdate() {
    if (this.refs.checkbox) {
      this.refs.checkbox.indeterminate = this.state.indeterminate;
    }
    if (this.refs.root) {
      this.state.css.forEach((v, k) => {
        this.refs.root.style.setProperty(k, v);
      });
    }
  }

  componentWillUnmount() {
    this.rippleFoundation.destroy();
    this.foundation.destroy();
  }

  render() {
    return (
      <div
        ref="root"
        className={classnames('mdc-checkbox', this.state.classes.toJS())}
      >
        <input
          ref="checkbox"
          id={this.props.controlId}
          type="checkbox"
          className="mdc-checkbox__native-control"
          checked={this.state.checked}
          onChange={(evt) => {
            this.setState({
              checked: this.refs.checkbox.checked,
              indeterminate: false,
            });
            this.props.onChange(evt);
          }}
        />
        <div className="mdc-checkbox__background">
          <svg
            version="1.1"
            className="mdc-checkbox__checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            xmlSpace="preserve"
          >
            <path
              className="mdc-checkbox__checkmark__path"
              fill="none"
              stroke="white"
              d="M1.73,12.91 8.1,19.28 22.79,4.59"
            />
          </svg>
          <div className="mdc-checkbox__mixedmark" />
        </div>
      </div>
    );
  }

  foundation = new MDCCheckboxFoundation({
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
    registerAnimationEndHandler: (handler) => {
      if (this.refs.root) {
        this.refs.root.addEventListener(getCorrectEventName(window, 'animationend'), handler);
      }
    },
    deregisterAnimationEndHandler: (handler) => {
      if (this.refs.root) {
        this.refs.root.removeEventListener(getCorrectEventName(window, 'animationend'), handler);
      }
    },
    registerChangeHandler: (handler) => {
      if (this.refs.checkbox) {
        this.refs.checkbox.addEventListener('change', handler);
      }
    },
    deregisterChangeHandler: (handler) => {
      if (this.refs.checkbox) {
        this.refs.checkbox.removeEventListener('change', handler);
      }
    },
    getNativeControl: () => this.refs.checkbox,
    forceLayout: () => this.refs.root.offsetWidth,
    isAttachedToDOM: () => Boolean(this.refs.root),
  });

  rippleFoundation = new MDCRippleFoundation(Object.assign(MDCRipple.createAdapter(this), {
    isUnbounded: () => true,
    isSurfaceActive: () => this.refs.root[MATCHES](':active'),
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
    registerInteractionHandler: (evtType, handler) => {
      this.refs.checkbox.addEventListener(evtType, handler);
    },
    deregisterInteractionHandler: (evtType, handler) => {
      this.refs.checkbox.removeEventListener(evtType, handler);
    },
    updateCssVariable: (varName, value) => {
      this.setState(prevState => ({
        css: prevState.css.set(varName, value),
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
