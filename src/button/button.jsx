import React from 'react';

import { Set as ImmutableSet, Map as ImmutableMap } from 'immutable';
import classnames from 'classnames';
import { MDCRipple, MDCRippleFoundation } from '@material/ripple';
import { getMatchesProperty } from '@material/ripple/util';
import '@material/button/dist/mdc.button.css';

const MATCHES = getMatchesProperty(HTMLElement.prototype);

export default class Button extends React.PureComponent {
  static propTypes = {
    dense: React.PropTypes.bool,
    raised: React.PropTypes.bool,
    compact: React.PropTypes.bool,
    primary: React.PropTypes.bool,
    accent: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
  }

  static defaultProps = {
    dense: false,
    raised: true,
    compact: false,
    primary: true,
    accent: false,
    disabled: false,
  }

  state = {
    classes: new ImmutableSet(),
    css: new ImmutableMap(),
  }

  componentDidMount() {
    this.rippleFoundation.init();
  }

  componentDidUpdate() {
    this.state.css.forEach((v, k, s) => {
      this.refs.root.style.setProperty(k, v);
    });
  }

  componentWillUnmount() {
    this.rippleFoundation.destroy();
  }

  render() {
    return (
      <button
        ref="root"
        className={
                classnames(this.state.classes.toJS(), 'mdc-button', {
                  'mdc-button--dense': this.props.dense,
                  'mdc-button--raised': this.props.raised,
                  'mdc-button--compact': this.props.compact,
                  'mdc-button--primary': this.props.primary,
                  'mdc-button--accent': this.props.accent,
                })
              }
        disabled={this.props.disabled}
      >
        {this.props.children}
      </button>
    );
  }

  rippleFoundation = new MDCRippleFoundation(
    Object.assign(MDCRipple.createAdapter(this), {
      isUnbounded: () => false,
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
        if (this.refs.root) {
          this.refs.root.addEventListener(evtType, handler);
        }
      },
      deregisterInteractionHandler: (evtType, handler) => {
        if (this.refs.root) {
          this.refs.root.removeEventListener(evtType, handler);
        }
      },
      registerResizeHandler: (handler) => {
        window.addEventListener('resize', handler);
      },
      deregisterResizeHandler: (handler) => {
        window.removeEventListener('resize', handler);
      },
      updateCssVariable: (varName, value) => {
        this.setState({ css: this.state.css.set(varName, value) });
      },
      computeBoundingRect: () => this.refs.root.getBoundingClientRect(),
      getWindowPageOffset: () => ({ x: window.pageXOffset, y: window.pageYOffset }),
    }));
}

function filterUnusedProps(props, usedProps) {
  const empty = {};

  for (const key in props) {
    if (!props.hasOwnProperty(key)) {
      continue;
    }

    if (usedProps.hasOwnProperty(key)) {
      continue;
    }

    empty[key] = props[key];
  }

  return empty;
}
