import { Card, Button, Upload, Space,Select} from 'antd';
import { useState,useEffect} from 'react';
import React from 'react';
import { Menu, Dropdown, message, Tooltip, Input} from 'antd';
import { DownOutlined, UserOutlined, BorderlessTableOutlined, UploadOutlined} from '@ant-design/icons';
import Axios from "axios";
import "./assign.css";
const Assign = () => {

  const [selectedFile, set_selectedFile] = useState(null);
  const [annotator, set_annotator] = useState('annotator1');
  const [roles,set_roles] = useState([])
  const { Option } = Select;

  function onChangeHandlerAnnotator(value) {
    set_annotator(value);
  }
  const onChangeHandler = (event) => {
    set_selectedFile(event.target.files[0])
    //console.log(event.target.files[0])
  }
  const onUploadHandler = () => {
    let data = new FormData() 
    data.append('file', selectedFile)
    data.append('annotator',annotator)
    fetch('/api/assign_tweets', {
      method: 'POST',
      body: data,
    }).then((response) => {
      if (response.status == 200) {
        message.success('Assigned successfully')
      }
    });
 
  }
  useEffect(() => {
    Axios.get('/api/get_roles').then(res => {

        set_roles(res.data['roles']);
    })
}, [])
  
    

    return (
        <Card title="Assign Tweets"  >
        Please upload the file:
        <input className='margin' type="file" name="file" onChange={onChangeHandler}/>
       
        
        Please choose the annotator to assign:
        <Select className='margin' defaultValue={annotator} style={{ width: 120 }} onChange={onChangeHandlerAnnotator}>
          {roles.map((r,i) => {
                      return <Option key={"key"+i} value={r.username}>{r.username}</Option>
                    })
          }
        </Select>
        <div>
        <Button type="submit" onClick={onUploadHandler}>Submit</Button> 
        </div>
      </Card>
    )
} 

export default Assign