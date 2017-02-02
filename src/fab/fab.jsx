import React from 'react';

import { Set as ImmutableSet, Map as ImmutableMap } from 'immutable';

import classnames from 'classnames';

import { MDCRipple, MDCRippleFoundation } from '@material/ripple';
import { getMatchesProperty } from '@material/ripple/util';
import '@material/fab/dist/mdc.fab.css';

const MATCHES = getMatchesProperty(HTMLElement.prototype);

export default class FloatingActionButton extends React.PureComponent {
  static propTypes = {
    icon: React.PropTypes.string.isRequired,
    mini: React.PropTypes.bool,
    plain: React.PropTypes.bool,
  }

  static defaultProps = {
    mini: false,
    plain: false,
  }

  state = {
    rippleClasses: new ImmutableSet(),
    rippleCss: new ImmutableMap(),
  }

  componentDidMount() {
    this.rippleFoundation.init();
  }

  componentDidUpdate() {
    this.state.rippleCss.forEach((v, k) => {
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
        className={classnames('mdc-fab', 'material-icons', this.state.rippleClasses.toJS(), {
          'mdc-fab--mini': this.props.mini,
          'mdc-fab--plain': this.props.plain,
        })}
        aria-label={this.props.icon}
      >
        <span className="mdc-fab__icon">
          {this.props.icon}
        </span>
      </button>
    );
  }

  rippleFoundation = new MDCRippleFoundation(
    Object.assign(MDCRipple.createAdapter(this), {
      isUnbounded: () => false,
      isSurfaceActive: () => this.refs.root[MATCHES](':active'),
      addClass: (className) => {
        this.setState(prevState => ({
          rippleClasses: prevState.rippleClasses.add(className),
        }));
      },
      removeClass: (className) => {
        this.setState(prevState => ({
          rippleClasses: prevState.rippleClasses.remove(className),
        }));
      },
      registerInteractionHandler: (type, handler) => {
        if (this.refs.root) {
          this.refs.root.addEventListener(type, handler);
        }
      },
      deregisterInteractionHandler: (type, handler) => {
        if (this.refs.root) {
          this.refs.root.removeEventListener(type, handler);
        }
      },
      updateCssVariable: (varName, value) => {
        this.setState(prevState => ({
          rippleCss: prevState.rippleCss.set(varName, value),
        }));
      },
      computeBoundingRect: () => this.refs.root.getBoundingClientRect(),
    }));
}
