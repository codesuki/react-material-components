import React from 'react';

import '@material/drawer/dist/mdc.drawer.css';
import '@material/list/dist/mdc.list.css';
import '@material/typography/dist/mdc.typography.css';

export default class PermanentDrawer extends React.PureComponent {
  render() {
    return (
      <nav className="mdc-permanent-drawer mdc-typography">
        <div className="mdc-permanent-drawer__toolbar-spacer" />
        <div className="mdc-permanent-drawer__content">
          <nav id="icon-with-text-demo" className="mdc-list">
            <a className="mdc-list-item mdc-permanent-drawer--selected" href="#">
              <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">inbox</i>Inbox
            </a>
            <a className="mdc-list-item" href="#">
              <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">star</i>Star
            </a>
          </nav>
        </div>
      </nav>
    );
  }
}
