import React from 'react';

import classnames from 'classnames';
import '@material/list/dist/mdc.list.css';

export class List extends React.PureComponent {
  static propTypes = {
    dense: React.PropTypes.bool,
    twoLines: React.PropTypes.bool,
    dark: React.PropTypes.bool,
  }

  static defaultProps = {
    dense: false,
    twoLines: false,
    dark: false,
  }

  render() {
    return (
      <ul
        className={classnames('mdc-list', {
          'mdc-list--dense': this.props.dense,
          'mdc-list--two-line': this.props.twoLines,
          'mdc-list--theme-dark': this.props.dark,
        })}
      >
        {this.props.children}
      </ul>
    );
  }
}

export class ListItem extends React.PureComponent {
  render() {
    return (
      <li href="#" className="mdc-list-item">{this.props.children}</li>
    );
  }
}

export class ListDivider extends React.PureComponent {
  static propTypes = {
    inset: React.PropTypes.bool,
  }

  static defaultProps = {
    inset: false,
  }

  render() {
    return (
      <li
        role="separator"
        className={classnames('mdc-list-divider', { 'mdc-list-divider--inset': this.props.inset })}
      />
    );
  }
}

export class ListGroup extends React.PureComponent {
  render() {
    return (
      <div className="mdc-list-group">{this.props.children}</div>
    );
  }
}

export class ListGroupHeader extends React.PureComponent {
  render() {
    return (
      <h3 className="mdc-list-group__subheader">{this.props.children}</h3>
    );
  }
}
