import React from 'react';

import { Set as ImmutableSet, Map as ImmutableMap } from 'immutable';

import classnames from 'classnames';

import { MDCTextfieldFoundation } from '@material/textfield';
import '@material/textfield/dist/mdc.textfield.css';

// TODO:
// - make helptext dependence on input possible
// - better support for validation
export default class Textfield extends React.PureComponent {
  static propTypes = {
    text: React.PropTypes.string,
    validationMessage: React.PropTypes.string,
    persistantHelp: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    required: React.PropTypes.bool,
  }

  static defaultProps = {
    text: '',
    validationMessage: '',
    persistantHelp: false,
    disabled: false,
    required: false,
  }

  state = {
    classes: new ImmutableSet(),
    labelClasses: new ImmutableSet(),
    helptextClasses: new ImmutableSet(),
    helptextAttributes: new ImmutableMap(),
    text: this.props.text,
  }

  componentDidMount() {
    this.foundation.init();
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  render() {
    return (
      <div>
        <div
          className={classnames('mdc-textfield', this.state.classes.toJS(), {
            'mdc-textfield--disabled': this.props.disabled,
          })}
        >
          <input
            ref="input"
            type="text"
            id="my-textfield"
            className="mdc-textfield__input"
            disabled={this.props.disabled}
            required={this.props.required}
            value={this.state.text}
            onChange={(e) => {
              this.setState({
                text: this.refs.input.value,
              });
            }}
            minLength="8"
          />
          <label
            className={classnames('mdc-textfield__label', this.state.labelClasses.toJS(), {
              'mdc-textfield__label--float-above': Boolean(this.state.text),
            })}
            htmlFor="my-textfield"
          >Hint text</label>
        </div>
        <p
          id="username-helptext"
          className={classnames('mdc-textfield-helptext', this.state.helptextClasses.toJS(), {
            'mdc-textfield-helptext--persistent': this.props.persistantHelp,
            'mdc-textfield-helptext--validation-msg': this.props.validationMessage,
          })}
          aria-hidden={this.state.helptextAttributes.get('aria-hidden')}
          role={this.state.helptextAttributes.get('role')}
        >
        This will be displayed on your public profile
      </p>
      </div>
    );
  }

  foundation = new MDCTextfieldFoundation({
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
    addClassToLabel: (className) => {
      this.setState(prevState => ({
        labelClasses: prevState.labelClasses.add(className),
      }));
    },
    removeClassFromLabel: (className) => {
      this.setState(prevState => ({
        labelClasses: prevState.labelClasses.remove(className),
      }));
    },
    addClassToHelptext: (className) => {
      this.setState(prevState => ({
        helptextClasses: prevState.helptextClasses.add(className),
      }));
    },
    removeClassFromHelptext: (className) => {
      this.setState(prevState => ({
        helptextClasses: prevState.helptextClasses.remove(className),
      }));
    },
    helptextHasClass: className => this.state.helptextClasses.has(className),
    registerInputFocusHandler: (handler) => {
      if (this.refs.input) {
        this.refs.input.addEventListener('focus', handler);
      }
    },
    deregisterInputFocusHandler: (handler) => {
      if (this.refs.input) {
        this.refs.input.removeEventListener('focus', handler);
      }
    },
    registerInputBlurHandler: (handler) => {
      if (this.refs.input) {
        this.refs.input.addEventListener('blur', handler);
      }
    },
    deregisterInputBlurHandler: (handler) => {
      if (this.refs.input) {
        this.refs.input.removeEventListener('blur', handler);
      }
    },
    registerInputInputHandler: (handler) => {
      if (this.refs.input) {
        this.refs.input.addEventListener('input', handler);
      }
    },
    deregisterInputInputHandler: (handler) => {
      if (this.refs.input) {
        this.refs.input.removeEventListener('input', handler);
      }
    },
    registerInputKeydownHandler: (handler) => {
      if (this.refs.input) {
        this.refs.input.addEventListener('keydown', handler);
      }
    },
    deregisterInputKeydownHandler: (handler) => {
      if (this.refs.input) {
        this.refs.input.removeEventListener('keydown', handler);
      }
    },
    setHelptextAttr: (name, value) => {
      this.setState(prevState => ({
        helptextAttributes: prevState.helptextAttributes.set(name, value),
      }));
    },
    removeHelptextAttr: (name) => {
      this.setState(prevState => ({
        helptextAttributes: prevState.helptextAttributes.delete(name),
      }));
    },
    getNativeInput: () => this.refs.input,
  });
}
