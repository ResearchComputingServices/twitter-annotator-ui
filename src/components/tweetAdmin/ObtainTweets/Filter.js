import { Card, Button, DatePicker, Space} from 'antd';
import { useState } from 'react';
import React from 'react';
import { Menu, Dropdown, message, Tooltip, Input, Checkbox, InputNumber } from 'antd';
import { DownOutlined, UserOutlined, BorderlessTableOutlined } from '@ant-design/icons';
import Axios from "axios";
import "./filter.css";
const Filter = () => {

    const { RangePicker } = DatePicker;
    const [dates, set_dates] = useState([]);
    const [assined_booliean,set_assigned_booliean] = useState(false);
    const[tweet_num,set_tweet_num] = useState(100);
    function onChangeDate(value, dateString) {
      set_dates(dateString);
    }
    const onChangeUnassigned = (event) => {
      set_assigned_booliean(event.target.checked);
    }
    function onChangeTweetNumber(value) {
      console.log(value);
      set_tweet_num(value);
    }

    const get_tweets = () => {
      if (dates.length) {
          Axios.get('/api/get_tweets_by_date',{params:{"date1":dates[0],"date2":dates[1],"unassigned":assined_booliean}}).then(res => {
            if (res.data === "success") {
              message.success('Downloading')
              Axios.get('/api/download',{params:{"filename":"tweets.csv"}}).then(resource => {
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
      else{
        
      }

  }

  const get_tweets2 = () => {
    if (tweet_num>0) {
        Axios.get('/api/get_random_tweets',{params:{"num":tweet_num}}).then(res => {
          if (res.data === "success") {
            message.success('Downloading')
            Axios.get('/api/download',{params:{"filename":"tweets.csv"}}).then(resource => {
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
    else{
      message.error('Please type a valid number for tweets to download.')
    }
  }

    return (
      <div>
        <Card className = 'filter' title="Download Tweets"  >
        <div>
        <p>Date ranges</p>
        <Space direction="horizontal" size={12}>

        <RangePicker
            format="YYYY-MM-DD"
            onChange={onChangeDate}
        />
        </Space>
        </div>
        <div className='margin'>
        <Checkbox onChange={onChangeUnassigned}>Download only unassigned and unannotated tweets</Checkbox> 
        </div>
        <p>
        <Button className='margin' onClick={get_tweets}>Download Tweets</Button></p>
      </Card>


      <Card title="Download Random Unassigned Tweets"  >
        <div>
          <span>Please enter the number of tweets to download:</span>
          <InputNumber className='margin_left' min={1} defaultValue={100} onChange={onChangeTweetNumber} />
        </div>
        <p>
        <Button className='margin' onClick={get_tweets2}>Download Tweets</Button></p>
      </Card>
      </div>
    )
} 

export default Filter