import React, { useState, useEffect } from 'react'
import TestArea from './TestArea'
import ResultTextAea from './ResultTextAea'
import TestButton from './TestButton'
import Radios from "./Radios";
import Checkboxs from "./Checkboxs";
import BottomButtons from "./BottomButtons";
import BottomTextArea from "./BottomTextArea";
import { Divider, Form } from "antd";
import Axios from 'axios';
function Test() {
    const [content, set_content] = useState({})
    const [selected_text, set_selected_text] = useState([])
    const [highlight_status, set_highlight_status] = useState(false)
    const [questions, set_questions] = useState([])
    const [form] = Form.useForm()
    useEffect(() => {
        Axios.get('/api/get_question_option').then(res => {

            let { options, questions } = res.data
            console.log(res.data);

            questions.forEach(d => {
                let values = options.filter(v => v.question_id === d.id)
                d.options = values
            })
            questions = questions.filter(d => d.active)
            console.log(questions);
            set_questions(questions)
        })
    }, [])

    const finish = () => {
        // console.log(form.getFieldsValue());
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
            <Form form={form} onFinish={finish}>
                {
                    questions.map((d, i) => {
                        return d.question_type === 0 ?
                            <Radios name={d.text} options={d.options} key={"key" + i} /> :
                            d.question_type === 1 ?
                                <Checkboxs name={d.text} options={d.options} key={"key" + i} /> :
                                <BottomTextArea name={d.text} key={"key" + i} />
                    })
                }

            </Form>
            <BottomButtons selected_text={selected_text} content={content} form={form} set_content={set_content} set_selected_text={set_selected_text} />
        </div>
    )
}

export default Test
