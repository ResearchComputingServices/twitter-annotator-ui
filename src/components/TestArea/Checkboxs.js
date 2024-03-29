import React from 'react'
import { Checkbox, Typography, Form } from "antd";
const { Title } = Typography;

const CheckboxGroup = Checkbox.Group;
function Checkboxs({ name, text, options }) {
    return (
        <div className="checkbox">
            <Title level={4}>{text}</Title>
            <Form.Item name={name}>
                <CheckboxGroup options={options?.map(d => d.text)} style={{display:"grid", gridTemplateColumns:"100%"}}/>  
            </Form.Item>
        </div>
    )
}

export default Checkboxs
