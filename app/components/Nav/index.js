/**
 *
 * Nav
 *
 */

import React from 'react';
import { Menu, Layout } from 'antd';
import { Link } from 'react-router-dom';
import './styles.css';

function Nav() {
  const { Header } = Layout;
  return (
    <Header className="header">
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to="/">Filter Call Data</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/label">Modify Labels</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default Nav;
