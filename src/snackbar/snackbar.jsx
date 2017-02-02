import React from 'react';

import { Set as ImmutableSet, Map as ImmutableMap } from 'immutable';

import classnames from 'classnames';

import { getCorrectEventName } from '@material/animation';
import { MDCSnackbarFoundation } from '@material/snackbar';
import '@material/snackbar/dist/mdc.snackbar.css';

export default class Snackbar extends React.PureComponent {
  static propTypes = {
    message: React.PropTypes.string.isRequired,
  }

  static defaultProps = {
    message: '',
  }

  state = {
    classes: new ImmutableSet(),
    message: this.props.message,
  }

  componentDidMount() {
    this.foundation.init();
    this.foundation.show({ message: this.state.message });
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  render() {
    return (
      <div
        ref="root"
        className={classnames('mdc-snackbar', this.state.classes.toJS())}
        aria-live="assertive"
        aria-atomic="true"
        aria-hidden="true"
      >
        <div className="mdc-snackbar__text">{this.state.message}</div>
        <div className="mdc-snackbar__action-wrapper">
          <button ref="action" type="button" className="mdc-button mdc-snackbar__action-button">
            {this.state.actionText}
          </button>
        </div>
      </div>
    );
  }

  foundation = new MDCSnackbarFoundation({
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
    setAriaHidden: () => {},
    unsetAriaHidden: () => {},
    setMessageText: (message) => {
      this.setState({
        message,
      });
    },
    setActionText: (/* actionText: string */) => {},
    setActionAriaHidden: () => {},
    unsetActionAriaHidden: () => {},
    registerActionClickHandler: (handler) => {
      this.refs.action.addEventListener('click', handler);
    },
    deregisterActionClickHandler: (handler) => {
      this.refs.action.removeEventListener('click', handler);
    },
    registerTransitionEndHandler: (handler) => {
      this.refs.root.addEventListener(getCorrectEventName(window, 'transitionend'), handler);
    },
    deregisterTransitionEndHandler: (handler) => {
      this.refs.root.removeEventListener(getCorrectEventName(window, 'transitionend'), handler);
    },
  });
}
