import { Card, Button, DatePicker, Space} from 'antd';
import { useState, useEffect } from 'react';
import React from 'react';
import { Menu, Dropdown, message, Tooltip, Input, Checkbox, InputNumber, Select } from 'antd';
import { DownOutlined, UserOutlined, BorderlessTableOutlined } from '@ant-design/icons';
import Axios from "axios";
import "./filter.css";
const Annotations = () => {

  const { Option } = Select;

  const [annotator, set_annotator] = useState('all');

  const [roles,set_roles] = useState([])
  useEffect(() => {
    Axios.get('/api/get_roles').then(res => {

        set_roles(res.data['roles']);
    })
}, [])

    function onChangeHandlerAnnotator(value) {
      set_annotator(value);
    }

    const get_annotations = () => {
      
          Axios.get('/api/get_annotations',{params:{"annotator":annotator}}).then(res => {
            if (res.data === "success") {
              message.success('Downloading')
              Axios.get('/api/download',{params:{"filename":"annotations.csv"}}).then(resource => {
                const url = window.URL.createObjectURL(new Blob([resource.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'tweets.csv'); //or any other extension
                document.body.appendChild(link);
                link.click();
              })

            } else {
              message.error(res.data)
            }
          
              
          })
      

  }



    return (
      <div>
        <Card title="Download Annotations"  >
        Please choose the annotator to download the relevant annotations:
        <Select className='margin' defaultValue={annotator} style={{ width: 120 }} onChange={onChangeHandlerAnnotator}>
          {roles.map((r,i) => {
                      return <Option key={"key"+i} value={r.username}>{r.username}</Option>
                    })
          }
          <Option key = {"key_"} value = 'all' >All users</Option>
        </Select>
        <div>
        <Button className='margin' onClick={get_annotations}>Download Annotations</Button>
        </div>
      </Card>

      </div>
    )
} 

export default Annotations