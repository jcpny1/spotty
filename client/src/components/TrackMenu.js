import React from "react";
import { Button, Icon, Menu, Popup, Ref } from "semantic-ui-react";
import PropTypes from 'prop-types';


const PopupExample = (props) => {
  const {trackName} = props;
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef(null);

  const handleContextMenu = React.useCallback(
    e => {
      e.preventDefault();
      setOpen(!open);
    },
    [open]
  );
  const handlePopupClose = React.useCallback(() => setOpen(false), []);

  // <a href={item.track.preview_url} target='_blank' rel='noopener noreferrer'><Icon name='play' title='Play' /></a>}</Table.Cell>
  // <Icon name='dropdown' href='' title='edit' onContextMenu={this.handleContextMenu} /> :
  // <Button onContextMenu={handleContextMenu}>
  //   This button has Context Menu!
  // </Button>
  return (
    <React.Fragment>
      <Ref innerRef={buttonRef}>

      <a ><Icon name='dropdown' title={trackName} onContextMenu={handleContextMenu}/></a>

      </Ref>
      <Popup context={buttonRef} onClose={handlePopupClose} open={open}>
        <Menu
          items={[
            { key: "open", content: "Open file", icon: "file" },
            { key: "save", content: "Save file", icon: "box" }
          ]}
          secondary
          vertical
        />
      </Popup>
    </React.Fragment>
  );
};

export default PopupExample;
