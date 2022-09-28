import React from 'react'
import { Divider, Typography, Button, message } from "antd";
import Test from './Test'
import TweetEmbeded from "./TweetEmbeded";
import UserService from "../services/UserService";
import { useState, useEffect } from 'react';
import Axios from "axios";
const { Title } = Typography;
function TestHome() {
    const [currentTweetIdentifier, setCurrentIdentifier] = useState("0")
    const [tweetId, setTweetId] = useState("0")
    const [TweetsIdList,setTweetsIdList] = useState([])
    const username = UserService.getUsername()
    const [tweetText,setTweetText] = useState("")
    /*useEffect(() => {
        fetch('/api/get_tweet_id').then(res => res.json()).then(data => {
          setCurrentId(data);
          
        });
      }, []);*/
    useEffect(() => {
        Axios.get('/api/get_assigned_tweets',{params:{"username":username}}).then(res => {
          var tweets_ids_arr = res.data.tweet_ids
          setTweetsIdList(tweets_ids_arr) 
          if (Array.isArray(tweets_ids_arr) && tweets_ids_arr.length){
            Axios.get('/api/get_tweet_by_id',{params:{"id":tweets_ids_arr[0].toString()}}).then(res => { //it will return tweet identifier
                setCurrentIdentifier(res.data['tweet_id']) 
                setTweetId(tweets_ids_arr[0])
                setTweetText(res.data['text'])
            })
          
          }
            
        })
      }, []);

      const getTweets = () => {
        Axios.post('/api/assign_random_tweets', {"username":username}).then(res => {
          if (res.data === "success") {
              message.success('Saved Successfully!')
                      window.location.reload(false);
                      //index_to_remove = TweetsIdList.indexOf(tweetId)
                      //TweetsIdList_new = TweetsIdList.splice(index_to_remove,1)
                      //setTweetsIdList(TweetsIdList_new)
                
              
          } else {
              message.error('Save Failed!')
          }
          //message.success(data.statusText)
        })
      }

    return (
        <div className="content">
            <Title className="title">Twitter Annotator</Title>
            <div className="jumbotron">
            <h1>Remaining tweets to annotate: {TweetsIdList.length}</h1>
            
            </div>

            <Divider />
            <TweetEmbeded currentIden = {currentTweetIdentifier} tweetText = {tweetText}/>
            {TweetsIdList.length ?
              <Test currentIdentifier = {currentTweetIdentifier}  setIdentifier = {setCurrentIdentifier} tweetId = {tweetId} setTweetId = {setTweetId} TweetsIdList = {TweetsIdList} setTweetsIdList = {setTweetsIdList}/> :
            <div><p>You do not have any assigned tweet! You can press the following button to assign 100 tweets to yourself!</p><div style={{marginBottom: "5px"}}><Button onClick={getTweets}>Assign</Button></div> </div>}

        </div>
        
    )
}

export default TestHome
