import React from 'react';
import ReactDOM from 'react-dom';

import Button from './button/button.jsx';
import Checkbox from './checkbox/checkbox.jsx';
import Card from './card/card.jsx';
import Drawer from './drawer/drawer.jsx';
import { List, ListItem, ListDivider, ListGroup, ListGroupHeader } from './list/list.jsx';
import IconToggle from './icon-toggle/iconToggle.jsx';
import Radio from './radio/radio.jsx';
import Snackbar from './snackbar/snackbar.jsx';
import FloatingActionButton from './fab/fab.jsx';

export class Test extends React.Component {
  render() {
    return (
      <div>
        <div>
          <FloatingActionButton icon="favorite" />
          <FloatingActionButton icon="favorite" mini />
          <FloatingActionButton icon="favorite" plain />
        </div>
        <div>
          <Radio name="group1" label="my label" checked />
          <Radio name="group1" label="my label 2" />
          <Radio name="group1" label="my label 3" />
        </div>
        <div>
          <Snackbar message="Hello Snackbar" />
        </div>
        <div>
          <IconToggle
            dataToggleOn='{"label": "Remove from favorites", "content": "favorite"}'
            dataToggleOff='{"label": "Add to favorites", "content": "favorite_border"}'
          />
        </div>
        <div>
          <Drawer />
        </div>
        <div>
          Test <Button raised primary value="value">Test Butoni</Button>
        </div>
        <div>
          <Checkbox />
        </div>
        <div>
          <Card />
        </div>
        <div>
          <List>
            <ListGroup>
              <ListGroupHeader>Header</ListGroupHeader>
              <ListItem>Bla1</ListItem>
              <ListDivider inset />
              <ListItem>Bla2</ListItem>
            </ListGroup>
            <ListItem>BlaBla</ListItem>
            <ListDivider />
            <ListItem>Bla3</ListItem>
          </List>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Test />,
  document.getElementById('app'),
);
