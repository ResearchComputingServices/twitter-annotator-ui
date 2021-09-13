import React from 'react'
import { Divider, Typography } from "antd";
import Test from './Test'
import TweetEmbeded from "./TweetEmbeded";
const { Title } = Typography;
function TestHome() {
    return (
        <div className="content">
            <Title className="title">Twitter Annotator</Title>
            
            <Divider />
            <TweetEmbeded/>
            <Test />

        </div>
    )
}

export default TestHome
