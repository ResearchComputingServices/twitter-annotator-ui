import React from 'react'
import TweetEmbed from 'react-tweet-embed';
import TwitterTweetEmbed from 'react-tweet-embed';
import { useState, useEffect, useRef } from 'react';
import { Typography } from 'antd';
import { Card } from 'antd';

const { Title,Text } = Typography;
function TweetEmbeded({currentIden,tweetText}) {
    const tweet = useRef(null);
    const par = useRef(null);
    const [loaded, setLoaded] = useState(true)
    var d;
    useEffect(() => {
      const timer = setTimeout(() => {
        tweet.current ? (tweet.current._div.childElementCount == 0 ? setLoaded(false):setLoaded(true)): setLoaded(true);
      }, 1000);
    }, [tweet.current]);

    return (
        <div ref={par}>
          {currentIden === "0"?"":<TweetEmbed id={currentIden} ref={tweet} options={{conversation: "none" , align : 'center' }} />}
          {loaded ? "": <div><Text type="secondary">The live version of the tweet is not currently available and a simple form of its text is shown instead:</Text></div>}
          {loaded ? "": <Card>
              <p>{tweetText}</p>
            </Card>}
        </div>
    )
}

export default TweetEmbeded