import React, { currentIdentifier, useEffect, useState } from 'react'
import TestArea from './TestArea'
import ResultTextAea from './ResultTextAea'
import TestButton from './TestButton'
import Radios from "./Radios";
import Checkboxs from "./Checkboxs";
import BottomButtons from "./BottomButtons";
import BottomTextArea from "./BottomTextArea";
import { Divider, Form, Input,Button, Typography} from "antd";
import Axios from 'axios';
import UserService from "../services/UserService";
import "./styles.css";

const { Title,Text } = Typography;
function Test({currentIdentifier, setIdentifier, tweetId, setTweetId, TweetsIdList, setTweetsIdList}) {
    //const [content, set_content] = useState({})
    const [selected_text, set_selected_text] = useState([])
    const [highlight_status, set_highlight_status] = useState(false)
    const [questions, set_questions] = useState([])
    const [form] = Form.useForm()
    useEffect(() => {
        Axios.get('/api/get_question_option').then(res => {

            let { options, questions } = res.data
            //console.log(res.data);

            questions.forEach(d => {
                let values = options.filter(v => v.question_id === d.id)
                d.options = values
            })
            questions = questions.filter(d => d.active)
            //console.log(questions);
            set_questions(questions)
        })
    }, [])

    const finish = () => {
        // console.log(form.getFieldsValue());
    }

    const skip_tweet = () => {
        const username = UserService.getUsername()
        Axios.put('/api/skip_irrelevant_tweet', {"username": username, "tweet_id":tweetId}).then(res => {
            if (res.data === "success") {
                window.location.reload(false);
                //index_to_remove = TweetsIdList.indexOf(tweetId)
                //TweetsIdList_new = TweetsIdList.splice(index_to_remove,1)
                //setTweetsIdList(TweetsIdList_new)
            }
        })        
        
    }
    return (
        <div>
            {/*
            <TestArea content={content.content} set_selected_text={set_selected_text} selected_text={selected_text}
                highlight_status={highlight_status} />
            <ResultTextAea selected_text={selected_text} selected_id={content.id} set_selected_text={set_selected_text} />
            <TestButton set_content={set_content} set_selected_text={set_selected_text} selected_text={selected_text}
                set_highlight_status={set_highlight_status} highlight_status={highlight_status} />
            */}
            <Divider />
            <p>In case the content is irrelevant, skip the tweet by pressing the following button.</p>
            <Button onClick={skip_tweet}>Irrelevant Tweet</Button>
            <Divider />
            <Form form={form} onFinish={finish}>
                {
                    questions.map((d, i) => {
                        return d.question_type === 0 ?
                            [<Radios name={d.id} text = {d.text} options={d.options} key={"key" + i} />, 
                                d.other === true?
                                <Form.Item size = "middle" className = 'input' name={"other_" + d.id} label="Other:" >
                                <Input />
                                </Form.Item>:""
                            ]  
                            :
                            d.question_type === 1 ?
                                [
                                <Checkboxs name={d.id} text={d.text} options={d.options} key={"key" + i} />,
                                d.other == true?
                                <Form.Item size = "middle" className = 'input' name={"other_" + d.id} label="Other:">
                                <Input/>
                                </Form.Item>:""
                                 ] 
                                 :
                                <BottomTextArea name={d.id} text={d.text} key={"key" + i} />
                    
                    })
                }

            </Form>
            <BottomButtons selected_text={selected_text} content={currentIdentifier} form={form} set_content={setIdentifier} set_selected_text={set_selected_text} tweetId = {tweetId} setTweetId = {setTweetId} TweetsIdList = {TweetsIdList} setTweetsIdList={setTweetsIdList}/>
        </div>
    )
}

export default Test
