import React from 'react';

import { Set as ImmutableSet, Map as ImmutableMap } from 'immutable';

import classnames from 'classnames';

import { MDCRipple, MDCRippleFoundation } from '@material/ripple';
import { MDCIconToggleFoundation } from '@material/icon-toggle';
import '@material/icon-toggle/dist/mdc.icon-toggle.css';

export default class IconToggle extends React.PureComponent {
  static propTypes = {
    disabled: React.PropTypes.bool,
    labelOff: React.PropTypes.string,
    labelOn: React.PropTypes.string,
    dataToggleOn: React.PropTypes.string.isRequired,
    dataToggleOff: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
  }

  static defaultProps = {
    disabled: false,
    onChange: () => {},
  }

  state = {
    classes: new ImmutableSet(),
    rippleCss: new ImmutableMap(),
    attributes: new ImmutableMap({
      'data-toggle-on': this.props.dataToggleOn,
      'data-toggle-off': this.props.dataToggleOff,
    }),
    text: '',
    tabIndex: 0,
  }

  componentDidMount() {
    this.foundation.init();
    this.rippleFoundation.init();
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
      <i
        ref="root"
        className={classnames('mdc-icon-toggle', 'material-icons', this.state.classes.toJS(), {
          'mdc-icon-toggle--disabled': this.props.disabled,
        })}
        role="button"
        tabIndex={this.state.tabIndex}
        aria-pressed={this.state.attributes.get('aria-pressed')}
        aria-label={this.state.attributes.get('aria-label')}
        data-toggle-on='{"label": "Remove from favorites", "content": "favorite"}'
        data-toggle-off='{"label": "Add to favorites", "content": "favorite_border"}'
      >
        {this.state.text}
      </i>
    );
  }

  foundation = new MDCIconToggleFoundation({
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
    setText: (text) => { console.log(text); this.setState({ text }); },
    getTabIndex: () => this.state.tabIndex,
    setTabIndex: (tabIndex) => {
      this.setState({ tabIndex });
    },
    getAttr: name => this.state.attributes.get(name) || '',
    setAttr: (name, value) => {
      console.log(`setAttr: ${name}:${value}`);
      this.setState(prevState => ({
        attributes: prevState.attributes.set(name, value),
      }));
    },
    rmAttr: (name) => {
      this.setState(prevState => ({
        attributes: prevState.attributes.delete(name),
      }));
    },
    notifyChange: (evtData) => { this.props.onChange(evtData); },
  });

  rippleFoundation = new MDCRippleFoundation(
    Object.assign(MDCRipple.createAdapter(this), {
      isUnbounded: () => true,
      isSurfaceActive: () => this.foundation.isKeyboardActivated(),
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
      computeBoundingRect: () => {
        const dim = 48;
        const { left, top } = this.refs.root.getBoundingClientRect();
        return {
          left,
          top,
          width: dim,
          height: dim,
          right: left + dim,
          bottom: left + dim,
        };
      },
    }));
}
