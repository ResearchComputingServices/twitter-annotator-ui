import React from 'react'
import TweetEmbed from 'react-tweet-embed';
import { useState, useEffect } from 'react';

function TweetEmbeded(set_id) {
    const [currentId, setCurrentId] = useState(0);

    useEffect(() => {
        fetch('/api/get_tweet_id').then(res => res.json()).then(data => {
          setCurrentId(data);
          
        });
      }, []);

    return (
        <div>
          {/*
          <TweetEmbed className="tweetembed" id={currentId} placeholder={'loading'}/>
          */}
          <TweetEmbed className="tweetembed" id='991104230428733441' placeholder={'loading'}/>
        </div>
        )
}

export default TweetEmbeded