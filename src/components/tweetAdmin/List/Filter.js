import { Card, Button, DatePicker, Space} from 'antd';
import { useState } from 'react';
import React from 'react';
import { Menu, Dropdown, message, Tooltip, Input } from 'antd';
import { DownOutlined, UserOutlined, BorderlessTableOutlined } from '@ant-design/icons';

import "./filter.css";
const Filter = () => {

    const { RangePicker } = DatePicker;

    function onChange(value, dateString) {
      console.log('Selected Time: ', value);
      console.log('Formatted Selected Time: ', dateString);
    }
    
    function onOk(value) {
      console.log('onOk: ', value);
    }

    function handleButtonClick(e) {
        message.info('Click on left button.');
        console.log('click left button', e);
      }
      
      function handleMenuClick(e) {
        //message.info('Click on menu item.');
        console.log('click', e);
      }

      const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item key="1" icon={<BorderlessTableOutlined />}>
          torontostrong
          </Menu.Item>
          <Menu.Item key="2" icon={<BorderlessTableOutlined />}>
          incel
          </Menu.Item>
          <Menu.Item key="3" icon={<BorderlessTableOutlined />}>
          bluejays
          </Menu.Item>
          <Menu.Item key="4" icon={<BorderlessTableOutlined />}>
          spring
          </Menu.Item>
          <Menu.Item key="5" icon={<BorderlessTableOutlined />}>
          urban
          </Menu.Item>
        </Menu>
      );
      
    return (
        <Card className = 'filter' title="Filter"  >
        <p>Date ranges</p>
        <Space direction="horizontal" size={12}>

        <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            onChange={onChange}
            onOk={onOk}
        />
        </Space>
        <p>Hashtags</p>
        <Space>
        <Dropdown.Button onClick={handleButtonClick} overlay={menu}>
            Hashtags
        </Dropdown.Button>
        </Space>
        <p>Text search</p>
        <Input placeholder="Please enter here" />
        <Button type="primary">confirm</Button>
      </Card>
    )
} 

export default Filter