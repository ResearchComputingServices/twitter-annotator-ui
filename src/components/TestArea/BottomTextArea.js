import React from 'react'

import { Input, Typography, Form } from "antd";

const { Title } = Typography;
const { TextArea } = Input;
function BottomTextArea({ name }) {
    return (
        <div className="textbox">
            <Title level={4} className="test_title">{name}</Title>
            <Form.Item name={name}>
                <TextArea placeholder="Enter Here" style={{ height: "70px" }} />
            </Form.Item>
        </div>
    )
}

export default BottomTextArea
