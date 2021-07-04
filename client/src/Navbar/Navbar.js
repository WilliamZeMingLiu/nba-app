import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Layout, Menu, Typography, Image } from 'antd';
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

import logo from '../assets/logoA.png';

export default function Navbar(props) {
  const { Header } = Layout;
  const { Title } = Typography;
  const isSmallScreen = useMediaQuery({ query: '(max-width: 800px)' });

  const selectedKey = props.selectedKey;

  function getDate(num){
    const timeElapsed = Date.now();
    const currTime = new Date(timeElapsed + num);
    var str = currTime.toString().split("(")[1];
    str = currTime.toDateString() + " (" + str;
    return str;
  }

  return (
        <Header style={{display: 'flex'}}>
            <div style={{display: 'flex', width: '140px', alignItems: 'center'}}>
                  <Image width={50} src={logo} preview={false}/>
                  <Title level={5} style={{marginLeft: '20px', color: '#ffffff', marginTop: '8px'}}>NBA StatHub</Title>
            </div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={selectedKey}>
              <Menu.Item key="1" ><Link exact to="/">Home</Link></Menu.Item>
              <Menu.Item key="2" ><Link exact to="/players">Players</Link></Menu.Item>
              <Menu.Item key="3"><Link exact to="/teams"></Link>Teams</Menu.Item>
              <Menu.Item key="4"><Link exact to="/compare"></Link>Compare</Menu.Item>
            </Menu>
        </Header>
  );
}



