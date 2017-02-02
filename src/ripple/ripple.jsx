import React from 'react';
import ReactDOM from 'react-dom';

import { Set as ImmutableSet, Map as ImmutableMap } from 'immutable';
import classnames from 'classnames';
import { MDCRipple, MDCRippleFoundation } from '@material/ripple';
import { getMatchesProperty } from '@material/ripple/util';

const MATCHES = getMatchesProperty(HTMLElement.prototype);

export default class Ripple extends React.PureComponent {
  static propTypes = {
    unbounded: React.PropTypes.bool,
  }

  static defaultProps = {
    unbounded: false,
  }

  state = {
    classes: new ImmutableSet(),
    css: new ImmutableMap(),
  }

  foundation = new MDCRippleFoundation(Object.assign(MDCRipple.createAdapter(this), {
    isUnbounded: () => this.props.unbounded,
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
      this.refs.root.addEventListener(evtType, handler);
    },
    deregisterInteractionHandler: (evtType, handler) => {
      this.refs.root.removeEventListener(evtType, handler);
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

  componentDidMount() {
    this.foundation.init();
  }

  componentDidUpdate() {
    const node = ReactDOM.findDOMNode(this.guy);
    console.log(node);
    if (this.refs.root) {
      this.state.css.forEach((v, k) => {
        node.style.setProperty(k, v);
      });
    }
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children,
                                                 (child) => {
                                                   console.log(child);
                                                   this.guy = React.cloneElement(child, {
                                                     className: classnames(child.className, this.state.classes.toJS()),
                                                   });
                                                   return this.guy;
                                                 });

    console.log(childrenWithProps);
    return (
      <div ref="root">{childrenWithProps}</div>
    );
  }
}

export class SimpleButton extends React.Component {
  render() {
    return (
      <button
        className={classnames('mdc-button mdc-button--raised mdc-button--primary', this.props.className)}
      >
        {this.props.children}
      </button>
    );
  }
}
