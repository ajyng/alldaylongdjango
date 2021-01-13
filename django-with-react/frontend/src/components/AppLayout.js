import React from 'react';
import './AppLayout.scss';
import { Input, Menu } from 'antd';
import SuggestionList from './SuggestionList';
import StoryList from './StoryList';
import LogoImage from 'assets/logo.png';

function AppLayout({ children }) {
    return (
        <div className="app">
            <div className="header">
                <h1 className="page-title">
                    <img src={LogoImage} alt="logo" style={{ width: '60px' }} />
                </h1>
                <div className="search">
                    <Input.Search />
                </div>
                <div className="topnav">
                    <Menu mode='horizontal'>
                        <Menu.Item>menu1</Menu.Item>
                        <Menu.Item>menu2</Menu.Item>
                        <Menu.Item>menu3</Menu.Item>
                    </Menu>
                </div>
            </div>
            <div className="contents">{children}</div>
            <div className="sidebar">
                <StoryList style={{ marginBottom: '1rem' }} />
                <SuggestionList />
            </div>
            <div className="footer">
                &copy; 2021. Ahn Jun Young.
            </div>
        </div>
    );
}

export default AppLayout;