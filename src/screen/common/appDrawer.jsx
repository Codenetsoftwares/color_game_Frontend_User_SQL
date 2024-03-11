import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Typography from './Typography';
import './appDrawer.css';
import { Link } from 'react-router-dom';

function AppDrawer() {
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);

  const menuItemStyles = {
    root: {
      fontSize: '13px',
      fontWeight: 400,
    },
    button: {
      '&:hover': {
        backgroundColor: '#c8fafa',
        color: '#79827b',
      },
    },
  };

  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div className="appbody ">
      <Sidebar>
        <div style={{ padding: '0 24px', marginBottom: '8px' }}>
          <Typography variant="body2" fontWeight={600} style={{ letterSpacing: '0.5px' }} color="">
            Popular
          </Typography>
        </div>

        <Menu menuItemStyles={menuItemStyles}>
          <MenuItem component={<Link to="/inplay" />}>In-Play</MenuItem>
          <SubMenu label="Documentation">
            <MenuItem>User Guide</MenuItem>
            <MenuItem>API Reference</MenuItem>
          </SubMenu>
          <MenuItem>Calendar</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default AppDrawer;
